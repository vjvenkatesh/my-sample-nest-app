import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usernew' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  role: string;
}
