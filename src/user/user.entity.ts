import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usernestjs' })
export class UserEntity {
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  username: string;
  @IsNotEmpty()
  @IsString()
  @Column()
  password: string;
  @IsOptional()
  @IsString()
  @Column()
  role: string;
}
