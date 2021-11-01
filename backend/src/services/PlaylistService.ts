import { Service } from "typedi";
import { getConnection } from "typeorm";
import { Playlist } from "../entity/Playlist";
import { User } from "../entity/User";
import { TrackService } from "./TrackService";

@Service()
export class PlaylistService {
  private _playlistRepository = getConnection().getRepository(Playlist);

  constructor(private _trackService: TrackService) {}

  /**
   * Create new playlist in db
   * @param {string} name - playlist's name
   * @param {User} user - user
   */
  async create(name: string, user: User): Promise<void> {
    const playlist = new Playlist();
    playlist.name = name;
    playlist.user = user;
    await this._playlistRepository.save(playlist);
  }

  /**
   * add Tracks to playlist
   * @param {number[]} tracks - array of track's ids
   * @param {number} playlistId - playlist's id
   */
  async add(tracks: number[], playlistId: number): Promise<void> {
    const playlist = await this._playlistRepository.findOne({
      relations: ["tracks"],
      where: { id: playlistId },
    });
    const newTracks = await this._trackService.getTrackByTrackId(tracks);
    playlist.tracks = playlist.tracks.concat(newTracks);
    await this._playlistRepository.save(playlist);
  }

  /**
   * Delete playlist
   * @param {number} id - playlist's id
   */
  async delete(id: number): Promise<void> {
    await this._playlistRepository.delete(id);
  }

  /**
   * Get all playlist info
   * @param {number} id - playlist's id'
   * @returns playlist info including tracks
   */
  async get(id: number): Promise<Playlist> {
    const playlist = await this._playlistRepository.findOne({
      where: { id: id },
      relations: ["tracks"],
    });
    return playlist;
  }
}
