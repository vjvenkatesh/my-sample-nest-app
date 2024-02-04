import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import puppeteer from 'puppeteer-core';
import { Browser } from 'puppeteer';
import puppeteer from 'puppeteer';

@Injectable()
export class BooksToScrapeService {
    constructor(private readonly configService: ConfigService) { }


    async getProducts(products: string) {
        console.log("----------------------<<<<<<<<<<<<<<<", products);

        const BASE_URL = this.configService.getOrThrow("books-endpoint");

        const browser: Browser = await puppeteer.launch({ headless: false });
        console.log(browser);
        try {
            const page = await browser.newPage();
            page.setDefaultNavigationTimeout(2 * 60 * 1000);


            await Promise.all([
                page.waitForNavigation(),
                page.goto(this.configService.getOrThrow("books-endpoint")),
            ]);


            const pageContent = await page.content();
            console.log(pageContent);





            const bookData = await page.evaluate((url) => {

                const convertPrice = (price: string) => {
                    return parseFloat(price.replace("£", ""))
                }


                const convertRating = (rating: string) => {
                    switch (rating) {
                        case 'One':
                            return 1;
                        case 'Two':
                            return 2;
                        case 'Three':
                            return 3;
                        case 'Four':
                            return 4;
                        case 'Five':
                            return 5;
                        default:
                            return 0;

                    }
                }

                const bookPods = Array.from(document.querySelectorAll('.product_pod'))


                const data = bookPods.map((book: any) => ({
                    title: book.querySelector('h3 a').getAttribute('title'),
                    price: convertPrice(book.querySelector('.price_color').innerText),

                    imgSrc: url + book.querySelector('img').getAttribute('src'),
                    rating: convertRating(book.querySelector('.star-rating').classList[1]),
                }))
                return data;
            }, BASE_URL)

            console.log(bookData);


            return bookData;




        }
        catch (err) {
            console.log("Error Found -----=---> ", err)
        }
        finally {
            await browser.close();
        }
    }

}
