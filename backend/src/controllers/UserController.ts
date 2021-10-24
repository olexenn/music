import { Body, JsonController, Post, Res } from 'routing-controllers';
import { Response } from 'express';
import { Service } from 'typedi';
import { getConnection } from 'typeorm';
import * as argon from 'argon2';
import * as jwt from 'jsonwebtoken'
import { User } from '../entity/User';
import { config } from '../config';
import {validate} from 'class-validator';

@JsonController("/auth")
@Service()
export class UserController {
  //constructor() {}
  //

  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      exp: Date.now() + config.jwtLifeTime,
      username: user.username
    }

    const token = jwt.sign(
      JSON.stringify(payload),
      config.jwtSecret,
    );

    return token;
  }

  @Post("/register")
  async register(@Res() res: Response, @Body() data: User) {
    if (!data.email || !data.password || !data.username) {
      return res.status(400).json({ msg: "Some Fields are empty" });
    }

    const hash = await argon.hash(data.password);
    const user = new User();
    user.email = data.email;
    user.username = data.username;
    user.password = hash;
    user.createdAt = new Date();


    const errors = await validate(user);
    if (errors.length > 0)
      return res.status(400).json({err: errors});
    else {
      try {
        const createdUser = await getConnection().getRepository(User).save(user);
        return res.status(201).json({ token: this.generateToken(createdUser) });
      } catch (e) {
        return res.status(500).send({err: "User with this email or username already exists"});
      }
    }
  }

  @Post("/login")
  async login(@Res() res: Response, @Body() data: User) {
    if (!data.password || (!data.email && !data.username))
      return res.status(403).json({ msg: "Some fields are empty" });

    const user = await getConnection().getRepository(User).findOne({where: [
      {username: data.username},
      {email: data.email}
    ]})
    if (!user)
      return res.status(401).json({ msg: "No User" });

    const isVerified = await argon.verify(user.password, data.password)
    if (!isVerified)
      return res.status(401).json({ msg: "Wrong PASSWORD" });

    return res.json({ token: this.generateToken(user) });
  }
}
