import { StringField } from 'src/decorators/field.decorators';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class RegisterResDto {
  @Expose()
  @StringField()
  userId!: string;
}
