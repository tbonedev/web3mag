import { NumberField, StringField } from 'src/decorators/field.decorators';

export class RefreshResDto {
  @StringField()
  accessToken!: string;

  @StringField()
  refreshToken!: string;

  @NumberField()
  tokenExpires!: number;
}
