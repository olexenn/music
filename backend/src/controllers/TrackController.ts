import {
  Body,
  Res,
  JsonController,
  Post,
  Get,
  Delete,
  UseBefore,
  Req,
  BadRequestError,
  Authorized,
  CurrentUser,
} from "routing-controllers";
import * as multer from "multer";
import { Response, Request } from "express";
import { Service } from "typedi";
import { TrackService } from "../services/TrackService";
import { User } from "../entity/User";

/**
 * Controller responsible for tracks
 * @link http://localhost:3001/tracks/
 */
@JsonController("/tracks")
@Service()
export class TrackController {
  constructor(private _trackService: TrackService) {}

  /**
   * Get all track's likes
   * @requires accessToken
   * @param {number} trackId - id of the track to get likes
   * @returns number of likes
   */
  @Authorized()
  @Get("/likes")
  async getLikes(@Res() res: Response, @Body() data: { trackId: number }) {
    if (!data.trackId) throw new BadRequestError("Not enough data");
    const likes = await this._trackService.getLikes(data.trackId);
    return res.json({ likes: likes });
  }

  /**
   * Get all tracks
   * @requires accessToken
   * @returns tracks
   */
  @Authorized()
  @Get("/tracks")
  async getTracks(@Res() res: Response) {
    const tracks = await this._trackService.getTracks();
    return res.json({ tracks: tracks });
  }

  /**
   * Upload new track
   * @requires accessToken
   * @param {file} audio - song'a audio(mp3/wav)
   * @param {file} image - song's cover(jpeg/jpg)
   * @param {string} artist - song's artist
   * @param {string} title - song's name
   * @returns message
   */
  @Post("/upload")
  @UseBefore(
    multer().fields([
      { maxCount: 1, name: "audio" },
      { maxCount: 1, name: "image" },
    ])
  )
  async upload(
    @Res() res: Response,
    @Req() req: Request,
    @Body() data: { artist: string; title: string },
    @CurrentUser({ required: true }) user: User
  ) {
    if (!data.artist || !data.title) {
      throw new BadRequestError("Not enough data");
    }
    // Я не знаю зачем оно надо, но только так тайпскрипт пропускает файлы
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    await this._trackService.addTrack(
      data.artist,
      data.title,
      files.audio[0],
      files.image[0],
      user
    );
    return res.status(201).json({ msg: "File was uploaded" });
  }

  /**
   * Add/remove like from the song
   * @requires accessToken
   * @param {number} trackId - track's id
   * @returns message
   */
  @Post("/like")
  async like(
    @Res() res: Response,
    @Body() data: { trackId: number },
    @CurrentUser({ required: true }) user: User
  ) {
    await this._trackService.toggleLike(user, data.trackId);
    return res.status(200).json({ msg: "Like was toggled" });
  }

  /**
   * Add listening to the song
   * @requires accessToken
   * @param {number} trackId - track's id
   * @returns message
   */
  @Authorized()
  @Post("/listen")
  async listen(@Res() res: Response, @Body() data: { trackId: number }) {
    if (!data.trackId) {
      throw new BadRequestError("Not enough data");
    }

    await this._trackService.addListening(data.trackId);
    return res.status(200).json({ msg: "added listening" });
  }

  /**
   * Delete user's song
   * @requires accessToken
   * @param {number} trackId - track's id
   * @returns message
   */
  @Authorized()
  @Delete("/delete")
  async delete(@Res() res: Response, @Body() data: { trackId: number }) {
    if (!data.trackId) throw new BadRequestError("Not enough data");
    await this._trackService.deleteTrack(data.trackId);
    return res.status(200).json({ msg: "Track Was Successfully deleted" });
  }

  /**
   * Get all liked songs
   * @requires accessToken
   * @returns liked tracks
   */
  @Get("/favourite")
  async getLiked(
    @Res() res: Response,
    @CurrentUser({ required: true }) user: User
  ) {
    const tracks = await this._trackService.getLiked(user);
    return res.json({ tracks: tracks });
  }
}
