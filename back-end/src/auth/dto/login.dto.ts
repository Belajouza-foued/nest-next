import { IsEmail, MinLength } from 'class-validator';
//length//
export class LoginDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
