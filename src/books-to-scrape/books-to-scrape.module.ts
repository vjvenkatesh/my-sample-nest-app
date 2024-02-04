import { Module } from '@nestjs/common';
import { BooksToScrapeController } from './books-to-scrape.controller';
import { BooksToScrapeService } from './books-to-scrape.service';

@Module({
  controllers: [BooksToScrapeController],
  providers: [BooksToScrapeService]
})
export class BooksToScrapeModule {}
