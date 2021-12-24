import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Like } from "./Like";
import { User } from "./User";

@Entity({ name: "tracks" })
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  artist: string;

  @Column()
  title: string;

  @Column()
  audio: string;

  @Column({ default: 0 })
  listenings: number;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ default: false })
  isDeleted: boolean;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.tracks, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => Like, (like) => like.track)
  likes: Like[];
}
