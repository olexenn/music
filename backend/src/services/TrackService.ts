import { Service } from "typedi";
import { getConnection, In } from "typeorm";
import { Track } from "../entity/Track";
import { Like } from "../entity/Like";
import { User } from "../entity/User";
import { FileService, FileType } from "./FileService";

@Service()
export class TrackService {
  private _trackRepository = getConnection().getRepository(Track);
  private _likeRepository = getConnection().getRepository(Like);

  constructor(private _fileService: FileService) {}

  /**
   * Get song's likes
   * @param {number} trackId
   * @returns all track's likes
   */
  async getLikes(trackId: number): Promise<number> {
    const likes = await this._likeRepository.count({
      where: { track: trackId },
    });
    return likes;
  }

  /**
   * Get all songs
   * @returns all tracks
   */
  async getTracks(): Promise<Track[]> {
    const tracks = await this._trackRepository.find();
    return tracks;
  }

  /**
   * Get tracks by their ids
   * @param {number} trackId
   * @returns track object
   */
  async getTrackByTrackId(trackId: number[]): Promise<Track[]> {
    const tracks = await this._trackRepository.find({
      where: { id: In(trackId) },
    });
    return tracks;
  }

  /**
   * Function to add or remove like on track
   * @param {User} user
   * @param {number} trackId
   */
  async toggleLike(user: User, trackId: number): Promise<void> {
    const track = await this._trackRepository.findOne(trackId);
    const oldLike = await this._likeRepository.findOne({
      where: { user: user, track: trackId },
    });
    if (!oldLike) {
      const like = new Like();
      like.user = user;
      like.track = track;
      await this._likeRepository.save(like);
      return;
    }
    await this._likeRepository.delete(oldLike);
  }

  /**
   * Function to get all liked songs
   * @param {User} user
   * @returns all user's liked tracks
   */
  async getLiked(user: User): Promise<Like[]> {
    const tracks = await this._likeRepository.find({
      relations: ["track"],
      where: { user: user },
    });
    return tracks;
  }

  /**
   * Function to add number of listenings
   * @param {number} trackId
   */
  async addListening(trackId: number): Promise<void> {
    const track = await this._trackRepository.findOne(trackId);
    track.listenings = track.listenings + 1;
    await this._trackRepository.save(track);
  }

  /**
   * Delete track
   * @param {number} trackId
   */
  async deleteTrack(trackId: number): Promise<void> {
    await this._trackRepository.delete(trackId);
  }

  /**
   * Add track to backend
   * @param {string} artist
   * @param {string} title
   * @param {file} audio
   * @param {file} image
   * @param {User} user
   */
  async addTrack(
    artist: string,
    title: string,
    audio: Express.Multer.File,
    image: Express.Multer.File,
    user: User
  ) {
    const track = new Track();
    track.artist = artist;
    track.title = title;
    track.audio = this._fileService.createFile(FileType.AUDIO, audio);
    track.image = this._fileService.createFile(FileType.IMAGE, image);
    track.user = user;
    track.createdAt = new Date();
    await this._trackRepository.save(track);
  }
}
