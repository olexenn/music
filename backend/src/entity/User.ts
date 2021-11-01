import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from "typeorm";
import { IsEmail, IsOptional, IsString } from "class-validator";
import { Track } from "./Track";
import { Like } from "./Like";
import { Playlist } from "./Playlist";
import { Token } from "./Token";

@Entity({ name: "users" })
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

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ default: false })
  isBanned: boolean;

  @OneToMany(() => Track, (track) => track.user)
  tracks: Track[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Playlist, (playlists) => playlists.user)
  playlists: Playlist[];

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];
}
