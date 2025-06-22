import { registerDecorator, type ValidationOptions } from 'class-validator';
import ms from 'ms';

export function IsMs(validationOptions?: ValidationOptions): PropertyDecorator {
  return (object: object, propertyName: string) => {
    registerDecorator({
      propertyName: propertyName,
      name: 'isMs',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          try {
            return (
              typeof value === 'string' &&
              value.length > 0 &&
              typeof ms(value as ms.StringValue) === 'number'
            );
          } catch {
            return false;
          }
        },
        defaultMessage() {
          return `$property must be a valid time duration (e.g. "1d", "2h", "3m")`;
        },
      },
    });
  };
}
