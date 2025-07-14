import { EmailField, PasswordField } from 'src/decorators/field.decorators';

export class RegisterReqDto {
  @EmailField()
  email!: string;

  @PasswordField()
  password!: string;
}
