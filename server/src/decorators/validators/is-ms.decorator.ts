import { registerDecorator, type ValidationOptions } from 'class-validator';
import * as ms from 'ms'; // ИСПРАВЛЕНИЕ: Используем синтаксис "import * as"

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
          if (typeof value !== 'string' || value.length === 0) {
            return false;
          }

          const result = ms(value as any);
          return result !== undefined;
        },
        defaultMessage() {
          return `$property must be a valid time duration (e.g. "1d", "2h", "3m")`;
        },
      },
    });
  };
}
