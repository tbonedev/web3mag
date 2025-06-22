import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserReqDto {
  @IsNotEmpty({ message: 'Username name is required' })
  @IsString({ message: 'Username name must be a string' })
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
