import 'reflect-metadata';
import express from 'express';
import passport from 'passport';
import { Strategy as TwitterStrategy, Profile } from 'passport-twitter';
import { createConnection, getCustomRepository } from 'typeorm';

import { getConfiguration } from './utils/configuration';
import { UserRepository } from './repositories/user';
import { AuthRouter } from './routers/auth';

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

  app.use('/auth', AuthRouter);

  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
}).catch(error => console.log('TypeORM connection error: ', error));
