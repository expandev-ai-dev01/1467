import { z } from 'zod';

export const zString = z.string().min(1);
export const zNullableString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema.nullable();
};

export const zName = z.string().min(1).max(200);
export const zNullableDescription = z.string().max(500).nullable();
export const zBit = z.number().int().min(0).max(1);
export const zFK = z.number().int().positive();
export const zNullableFK = z.number().int().positive().nullable();
export const zDateString = z.string().datetime();
export const zEmail = z.string().email();
export const zUrl = z.string().url();

export function validateRequiredParam(param: any, paramName: string): void {
  if (param === null || param === undefined) {
    throw new Error(`${paramName}Required`);
  }
}

export function validatePositiveNumber(value: number, fieldName: string): void {
  if (value < 0) {
    throw new Error(`${fieldName}MustBePositive`);
  }
}

export function validateNonNegativeNumber(value: number, fieldName: string): void {
  if (value < 0) {
    throw new Error(`${fieldName}MustBeEqualOrGreaterZero`);
  }
}
