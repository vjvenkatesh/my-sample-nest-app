import { Test, TestingModule } from '@nestjs/testing';
import { BooksToScrapeController } from './books-to-scrape.controller';

describe('BooksToScrapeController', () => {
  let controller: BooksToScrapeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksToScrapeController],
    }).compile();

    controller = module.get<BooksToScrapeController>(BooksToScrapeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
