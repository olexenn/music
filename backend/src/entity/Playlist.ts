import {
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Track } from "./Track";

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.playlists, { onDelete: "CASCADE" })
  user: User;

  @ManyToMany(() => Track, { cascade: true })
  @JoinTable()
  tracks: Track[];
}
