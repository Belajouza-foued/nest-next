import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { z } from 'zod';
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Utilisateur non trouvé');
    const valid = await bcrypt.compare(pass, user.password);
    if (!valid) throw new UnauthorizedException('Mot de passe incorrect');
    const { password, ...result } = user.toObject();
    return result;
  }

 
async login(data: any) {
     const parsed = loginSchema.parse(data);

    // 2️⃣ Chercher l'utilisateur
    const user = await this.usersService.findByEmail(parsed.email);
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }
   const isMatch = await bcrypt.compare(parsed.password, user.password);
  if (!isMatch) {
    throw new Error('Mot de passe incorrect');
  }
  const payload = { sub: user._id, email: user.email, role: user.role };
  const { password, ...safeUser } = user.toObject();

  return {
    access_token: this.jwtService.sign(payload),
    user: safeUser,
  };
}
}
