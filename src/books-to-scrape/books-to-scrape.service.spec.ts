import { Test, TestingModule } from '@nestjs/testing';
import { BooksToScrapeService } from './books-to-scrape.service';

describe('BooksToScrapeService', () => {
  let service: BooksToScrapeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksToScrapeService],
    }).compile();

    service = module.get<BooksToScrapeService>(BooksToScrapeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
