import { Controller, Get, Query } from '@nestjs/common';
import { BooksToScrapeService } from './books-to-scrape.service';

@Controller('books-to-scrape')
export class BooksToScrapeController {
    
    constructor(private booksToScrapeService : BooksToScrapeService){

    }

    @Get("products")
    async getProducts(@Query('product') product:string){
 
         return await this.booksToScrapeService.getProducts(product);
 
     }
}
