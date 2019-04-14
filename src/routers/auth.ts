import express, { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import fetch from 'node-fetch';

import { UserRepository } from '../repositories/user';

const userRepository = getCustomRepository(UserRepository);

export const AuthRouter = express.Router()
  .get('/twitter/callback', (request: Request, response: Response) => {
    // get access token from twitter api
  });
