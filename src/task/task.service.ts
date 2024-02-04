import { Injectable } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,

    ) { }




    async getUserTasks(userId: number) {
        // Find the user by ID
        const user = await this.userRepository.findOne({ where: {user_id:userId}});

        if (!user) {
            console.log(user);
            console.log(!user);
            
            throw new Error('User not found');
            
        }
        console.log(user);

        // Load the tasks associated with the user
        const tasks = await this.taskRepository.find({ where: { user: user }});

        return tasks;
    }



    async createTask(task: TaskEntity): Promise<TaskEntity> {
        const errors = await validate(task);
        if (errors.length > 0) {
            // Handle validation errors (throw an exception or return an error response)
            console.log(errors);
            throw new Error('Validation failed');
        }

        return this.taskRepository.save(task);
    }




}
