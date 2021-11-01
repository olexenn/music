import {
  Authorized,
  BadRequestError,
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  Post,
  Put,
  Res,
} from "routing-controllers";
import { Response } from "express";
import { Service } from "typedi";
import { PlaylistService } from "../services/PlaylistService";
import { User } from "../entity/User";

/**
 * Controller responsible for user's playlists
 * @link http://localhost:3001/playlist/
 */
@JsonController("/playlist")
@Service()
export class PlaylistController {
  constructor(private _playlistService: PlaylistService) {}

  /**
   * Creating playlist
   * @requires accessToken
   * @param {string} name - playlist's name
   * @returns message
   */
  @Post("/create")
  async createPlaylist(
    @Res() res: Response,
    @Body() data: { name: string },
    @CurrentUser({ required: true }) user: User
  ) {
    if (!data.name) throw new BadRequestError("Not enough data");
    await this._playlistService.create(data.name, user);
    return res.status(201).json({ msg: "Playlist created successfully" });
  }

  /**
   * Get playlist
   * @requires accessToken
   * @param {string} playlistId - playlist's id
   * @returns playlist with it's tracks
   */
  @Authorized()
  @Get("/get")
  async getPlaylist(
    @Res() res: Response,
    @Body() data: { playlistId: number }
  ) {
    if (!data.playlistId) throw new BadRequestError("Not enough data");
    const playlist = await this._playlistService.get(data.playlistId);
    return res.json({ playlist: playlist });
  }

  /**
   * Delete playlist
   * @requires accessToken
   * @param {string} playlistId - playlist's id
   * @returns message
   */
  @Authorized()
  @Delete("/delete")
  async deletePlaylist(
    @Res() res: Response,
    @Body() data: { playlistId: number }
  ) {
    if (!data.playlistId) throw new BadRequestError("Not enough data");
    await this._playlistService.delete(data.playlistId);
    return res.json({ msg: "Playlist deleted successfully" });
  }

  /**
   * Add songs to playlist
   * @requires accessToken
   * @param {number[]} tracks - track's ids to add
   * @returns message
   */
  @Authorized()
  @Put("/add")
  async addToPlaylist(
    @Res() res: Response,
    @Body() data: { tracks: number[]; playlistId: number }
  ) {
    await this._playlistService.add(data.tracks, data.playlistId);
    return res.json({ msg: "Playlist added successfully" });
  }
}
