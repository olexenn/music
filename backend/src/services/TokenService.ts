import * as jwt from "jsonwebtoken";
import { DeleteResult, getConnection } from "typeorm";
import { Service } from "typedi";
import { config } from "../config";
import { User } from "../entity/User";
import { Token } from "../entity/Token";
import { Tokens } from "../types/tokenType";

@Service()
export class TokenService {
  private _tokenRepository = getConnection().getRepository(Token);
  /**
   * Function to verify accessToken
   * @param {string} token - jwt accessToken
   * @returns jwt payload
   */
  async validateAccessToken(
    token: string
  ): Promise<string | jwt.JwtPayload | null> {
    try {
      const userData = jwt.verify(token, config.jwtSecret);
      return userData;
    } catch (e) {
      return null;
    }
  }

  /**
   * Verify refreshToken
   * @param {string} token jwt refreshToken
   * @returns jwt payload
   */
  async validateRefreshToken(
    token: string
  ): Promise<string | jwt.JwtPayload | null> {
    try {
      const userData = jwt.verify(token, config.jwtSecret);
      return userData;
    } catch (e) {
      return null;
    }
  }

  /**
   * Save refreshToken to db
   * @param {User} user - user
   * @param {string} refreshToken - jwt token
   * @returns refreshToken
   */
  async saveToken(user: User, refreshToken: string): Promise<Token> {
    const tokenData = await this._tokenRepository.findOne({
      where: { user: user },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return this._tokenRepository.save(tokenData);
    }
    const token = await this._tokenRepository.save({
      refreshToken: refreshToken,
      user: user,
    });
    return token;
  }

  /**
   * delete refreshToken from db
   * @param {string} refreshToken - token to remove
   * @returns result of deletion
   */
  async removeToken(refreshToken: string): Promise<DeleteResult> {
    const tokenData = await this._tokenRepository.delete(refreshToken);
    return tokenData;
  }

  /**
   * Find token in db
   * @param {string} refreshToken - token to find
   * @returns token
   */
  async findToken(refreshToken: string): Promise<Token> {
    const token = await this._tokenRepository.findOne({
      where: { refreshToken: refreshToken },
    });
    return token;
  }

  /**
   * Generate access and refresh tokens
   * @param {User} user - user's info for token
   * @returns accessToken and refreshToken
   */
  generateToken(user: User): Tokens {
    const payload = {
      sub: user.id,
      exp: Date.now() + parseInt(config.jwtLifeTime),
      username: user.username,
    };

    const accessToken = jwt.sign(JSON.stringify(payload), config.jwtSecret, {
      // expiresIn: "6m",
    });
    const refreshToken = jwt.sign(JSON.stringify(payload), config.jwtSecret, {
      // expiresIn: "6m",
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
