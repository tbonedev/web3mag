import { TokenField } from 'src/decorators/field.decorators';

export class RefreshReqDto {
  @TokenField()
  refreshToken!: string;
}
