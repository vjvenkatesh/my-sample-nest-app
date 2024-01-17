import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  RequestMapping,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser() {
    return this.userService.getUser();
  }

  @Get(':name')
 async getUserWithName(@Param('name') name: string , @Res() res:Response) {
     const record=await this.userService.getUserWithName(name);
     if(record !== null){
      console.log("inside controller",record);
       res.status(HttpStatus.CREATED).send(record);
     }
     else{
      res.status(HttpStatus.BAD_REQUEST).json([]);
     }
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Put(':name')
  updateUser(@Param('name') name: string, @Body() dto: CreateUserDto) {
    return this.userService.updateUser(name, dto);
  }

  @Delete(':name')
  deleteUser(@Param('name') name: string) {
    return this.userService.deleteUser(name);
  }
}
