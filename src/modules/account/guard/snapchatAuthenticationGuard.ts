import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthProvider } from '../enums/auth-provider.enum';

@Injectable()
export default class snapchatAuthenticationGuard extends AuthGuard(AuthProvider.Snapchat) {}
