import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async getUser() {
    return await this.userRepository.find();
  }

  async getUserWithName(name: string) {
    const data = await this.userRepository.findOne({ where: { username: name } });
    return await data;
  }

  async createUser(dto) {
    const data = this.userRepository.create(dto);
    return await this.userRepository.save(data);
  }

  async updateUser(name: string, dto) {
    const result = await this.userRepository.findOne({ where: { username: name } });

    Object.assign(result, dto);

    return await this.userRepository.save(result);
  }


  async deleteUser(name: string) {
    const result = await this.userRepository.findOne({ where: { username: name } });
    if (result !== null) {
      return await this.userRepository.remove(result);
    }
    else {
      return { "respond": "error occured", "message": "record doesn't exist" };
    }

  }




  async whereUser(query: string) {
    console.log(query);
    const result = await this.userRepository.find({ where: { role: query } });
    return result;
  }
}
