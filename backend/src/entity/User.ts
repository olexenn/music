import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { IsEmail, IsString } from "class-validator";

@Entity({name: "users"})
@Unique(["username"])
@Unique(["email"])
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  username: string;

  @Column()
  password: string;

  @Column({type: 'timestamp'})
  createdAt: Date;

  @Column({default: false})
  isBanned: boolean;
}
