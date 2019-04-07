import 'reflect-metadata';
import express, { Request, Response } from 'express';
import passport from 'passport';
import { Strategy as TwitterStrategy, Profile } from 'passport-twitter';
import { createConnection, getCustomRepository } from 'typeorm';

import { getConfiguration } from './utils/configuration';
import { User } from './entities/user';
import { UserRepository } from './repositories/user';

type DoneCallback = (error: any, user?: any) => void;

createConnection().then((connection) => {
  const app = express();

  app.use(express.json());
  app.use(passport.initialize());

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: getConfiguration('TWITTER_CONSUMER_KEY'),
        consumerSecret: getConfiguration('TWITTER_CONSUMER_SECRET'),
        callbackURL: getConfiguration('TWITTER_CALLBACK_URL'),
      },
      (accessToken: string, refreshToken: string, profile: Profile, done: DoneCallback) => {
        getCustomRepository(UserRepository)
          .findOrCreateByProfile(profile)
          .then(user => done(null, user))
          .catch(error => done(error));
      },
    ),
  );

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });

  app.post('/', (req: Request, res: Response) => {
    res.json(req.body);
  });

  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
}).catch(error => console.log('TypeORM connection error: ', error));
