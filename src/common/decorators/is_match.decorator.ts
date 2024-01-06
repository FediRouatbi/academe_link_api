import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

export const IsMatch =
  <T>(property: keyof T, options?: ValidationOptions) =>
  (object: unknown, propertyName: string) =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [property],
      validator: IsMatchConstraint,
    });

@ValidatorConstraint({ name: 'IsMatch' })
export class IsMatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args?: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.constraints[0]} and ${validationArguments.property} does not match`;
  }
}
