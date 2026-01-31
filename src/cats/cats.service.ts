import { BadRequestException, Injectable } from '@nestjs/common';
import { Cat } from './cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    if (!cat.age || cat.age < 0) {
      throw new BadRequestException('noooo'); // custom message
    }

    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
