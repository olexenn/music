import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { IsEmail, IsOptional, IsString } from "class-validator";

@Entity({name: "users"})
@Unique(["username"])
@Unique(["email"])
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsOptional()
  @IsEmail()
  email: string;

  @Column()
  @IsOptional()
  @IsString()
  username: string;

  @Column()
  password: string;

  @Column({type: 'timestamp'})
  createdAt: Date;

  @Column({default: false})
  isBanned: boolean;
}
