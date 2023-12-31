import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    // check sign in details are correct and return access_token
    async authorize(
        username: string,
        pass: string,
        type: string,
    ): Promise<any> {
        const user = await this.usersService.validate(username);
        const result = await bcrypt
            .compare(pass, user?.password)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
            });

        if (!result || type !== user?.radioOption) {
            console.log('error');
            throw new UnauthorizedException();
        }

        const payload = { sub: user.userId, username: user.uname };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async getUserDetails(username: string): Promise<any> {
        return this.usersService.validate(username);
    }
}
