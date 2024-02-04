import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tasknestjs' })
export class TaskEntity {
    @PrimaryGeneratedColumn()
    task_id: number;

    @IsNotEmpty()
    @IsString()
    @ManyToOne(type=>UserEntity, user=>user.tasks)
    user: UserEntity;

    @IsNotEmpty()
    @IsString()
    @Column()
    description: string;
}