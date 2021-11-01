import {
  Body,
  CookieParam,
  JsonController,
  Post,
  Res,
} from "routing-controllers";
import { Response } from "express";
import { Service } from "typedi";
import { User } from "../entity/User";
import { UserService } from "../services/UserService";

/**
 * Controller responsible for user's auth
 * @link http://localhost:3001/auth/
 */
@JsonController("/auth")
@Service()
export class UserController {
  constructor(private _userService: UserService) {}

  /**
   * Register user
   * @param {string} email - user's email
   * @param {string} username - username
   * @param {string} password - password
   * @returns accessToken and refreshToken
   */
  @Post("/register")
  async register(@Res() res: Response, @Body() data: User) {
    if (!data.email || !data.password || !data.username) {
      return res.status(400).json({ msg: "Some Fields are empty" });
    }

    try {
      const tokens = await this._userService.addUser(
        data.password,
        data.email,
        data.username
      );
      if (!tokens) return res.status(501).json({ msg: "error with tokens" });
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(201).json(tokens);
    } catch (e) {
      return res
        .status(500)
        .send({ err: "User with this email or username already exists" });
    }
  }

  /**
   * Login user
   * @param {string} [email] - user's email
   * @param {string} [username] - username
   * @param {string} password - password
   * @returns accessToken and refreshToken
   */
  @Post("/login")
  async login(@Res() res: Response, @Body() data: User) {
    if (!data.password || (!data.email && !data.username))
      return res.status(403).json({ msg: "Some fields are empty" });

    const user = await this._userService.getUser(data.email, data.username);
    if (!user) return res.status(401).json({ msg: "No User" });

    const tokens = await this._userService.loginUser(user, data.password);

    if (!tokens) return res.status(401).json({ msg: "Wrong PASSWORD" });

    return res.json(tokens);
  }

  /**
   * Refresh Token
   * @param {string} refreshToken - user's refreshToken in cookie
   * @param {string} password - password
   * @returns accessToken and refreshToken
   */
  @Post("/refresh")
  async refresh(
    @Res() res: Response,
    @CookieParam("refreshToken") refreshToken: string
  ) {
    const tokens = await this._userService.refresh(refreshToken);
    if (!tokens) return res.status(401).json({ msg: "Fuck you" });
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(tokens);
  }
}
