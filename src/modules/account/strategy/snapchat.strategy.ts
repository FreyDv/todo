import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-snapchat';

@Injectable()
export class SnapchatStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.CLIENT_ID_S,
      clientSecret: process.env.CLIENT_SECRET_S,
      callbackURL: process.env.CALLBACK_URL_S,
      profileFields: ['id', 'displayName', 'bitmoji'],
      scope: ['user.display_name', 'user.bitmoji.avatar'],
      pkce: false,
      // state: true,
    });
  }

  validate(accessToken: string, refreshToken: string, snapChatProfile: any, done) {
    return done(null, snapChatProfile);
  }
}
