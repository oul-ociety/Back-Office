import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
    ) {}

    // async valideUser(email: string, password: string): Promise<User | null> {
    //     const user = await this.electeursService.findOne(email);
    //     if (user && (await bcrypt.compare(password, user.password))) {
    //         return user;
    //     }
    //     return null;
    // }

    // async login(electeur: Electeur) {
    //     const payload = { email: electeur.email, sub: electeur.id, role: electeur.role };
    //     return { access_token: this.jwtService.sign(payload) };
    // }
}
