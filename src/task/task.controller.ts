import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { response } from 'express';
import { STATUS_CODES } from 'http';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':userId')
  async getUserTasks(@Param('userId') userId: string) {
    const tasks = await this.taskService.getUserTasks(parseInt(userId));
    if(!tasks){
        console.log("inside false");
        response.status(HttpStatus.NOT_FOUND).json({message:"user Not Found"});
        response.send();
    }
    return tasks;
  }
}
