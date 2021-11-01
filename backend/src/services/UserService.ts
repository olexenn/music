import { Service } from "typedi";
import { getConnection } from "typeorm";
import * as argon from "argon2";
import { User } from "../entity/User";
import { TokenService } from "./TokenService";
import { Tokens } from "../types/tokenType";

@Service()
export class UserService {
  private _userRepository = getConnection().getRepository(User);
  private _tokenService = new TokenService();

  /**
   * Adding new user to database
   * @param {string} password user's password
   * @param {string} email user's email
   * @param {string} username
   * @returns accessToken
   */
  async addUser(
    password: string,
    email: string,
    username: string
  ): Promise<Tokens> {
    const hash = await argon.hash(password);
    const user = new User();
    user.email = email;
    user.username = username;
    user.password = hash;
    user.createdAt = new Date();

    const createdUser = await this._userRepository.save(user);
    const tokens = this._tokenService.generateToken(createdUser);
    if (!tokens) return null;
    await this._tokenService.saveToken(user, tokens.refreshToken);
    return tokens;
  }

  /**
   * Get user info by email or username
   * @param {string} [email]
   * @param {string} [username]
   * @returns User
   */
  async getUser(email?: string, username?: string): Promise<User> {
    const user = await this._userRepository.findOne({
      where: [{ username: username }, { email: email }],
    });
    return user;
  }

  /**
   * Login user
   * @param {User} user
   * @param {string} password
   * @returns accessToken
   */
  async loginUser(user: User, password: string): Promise<Tokens | null> {
    const isVerified = await argon.verify(user.password, password);
    if (!isVerified) {
      return null;
    }
    return this._tokenService.generateToken(user);
  }

  /**
   * Find user by his id, use to get user by jwt
   * @param {string} token - accessToken
   * @returns User
   */
  async findUserByToken(token: string): Promise<User> {
    const userData = await this._tokenService.validateAccessToken(token);
    return await this._userRepository.findOne({ where: { id: userData.sub } });
  }

  /**
   * Refresh jwt tokens
   * @param refreshToken
   * @returns accessToken and refreshToken
   */
  async refresh(refreshToken: string): Promise<Tokens> {
    const userData = await this._tokenService.validateRefreshToken(
      refreshToken
    );
    const tokenFromDb = await this._tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) return null;

    const user = await this._userRepository.findOne({
      where: { id: userData.sub },
    });
    const tokens = this._tokenService.generateToken(user);

    console.log(tokens);

    if (!tokens) return null;

    await this._tokenService.saveToken(user, tokens.refreshToken);
    return tokens;
  }
}
