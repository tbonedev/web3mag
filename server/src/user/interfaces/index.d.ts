import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDTO {
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  readonly firstName: string;
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  readonly lastName: string;
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({ message: 'Invalid email format' })
  readonly email: string;
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(9, { message: 'Password must be at least 9 characters long' })
  readonly password: string;
}
