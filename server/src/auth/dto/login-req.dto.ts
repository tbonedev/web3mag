import { EmailField, PasswordField } from 'src/decorators/field.decorators';
export class LoginReqDto {
  @EmailField()
  email!: string;

  @PasswordField()
  password!: string;
}
