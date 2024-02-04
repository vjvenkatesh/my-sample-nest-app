import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskEntity } from './task.entity';
import { UserEntity } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity,TaskEntity])],
    controllers:[TaskController],
    providers:[TaskService],

})
export class TaskModule {}
