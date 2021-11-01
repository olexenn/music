import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Track } from "./Track";

@Entity({ name: "likes" })
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Track, (track) => track.likes, { onDelete: "CASCADE" })
  track: Track;
}
