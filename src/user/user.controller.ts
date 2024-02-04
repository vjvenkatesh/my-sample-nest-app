import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  RequestMapping,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { Response } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly loggerService: LoggerService) { }

  @Get()
  getUser() {
    this.loggerService.error('This is an error message', 'Stack trace');
    return this.userService.getUser();
  }
  @Get("role")
  async whereUser(@Query('role') role: string) {
    return await this.userService.whereUser(role);
  }
  @Get(':name')
  async getUserWithName(@Param('name') name: string, @Res() res: Response) {
    const record = await this.userService.getUserWithName(name);
    if (record !== null) {
      res.status(HttpStatus.OK).send(record);
    }
    else {
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
