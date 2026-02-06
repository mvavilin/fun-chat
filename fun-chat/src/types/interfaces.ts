import type { ElementBuilder } from '@utils';

export interface EventOptions {
  type: string;
  handler: EventListenerOrEventListenerObject;
  options?: boolean | AddEventListenerOptions;
}

interface Element {
  tag?: keyof HTMLElementTagNameMap | undefined;
  id?: string | undefined;
  classes?: string[] | undefined;
  content?: string | undefined;
  attributes?: Record<string, string> | undefined;
  styles?: Partial<CSSStyleDeclaration> | undefined;
  events?: EventOptions[] | undefined;
  children?: ElementBuilder[] | undefined;
}

export type ElementBuilderOptions = Element;

export interface ButtonBuilderOptions extends ElementBuilderOptions {
  type?: HTMLButtonElement['type'] | undefined;
  disabled?: boolean | undefined;
}

export type ButtonComponentOptions = ButtonBuilderOptions;

export interface InputBuilderOptions extends ElementBuilderOptions {
  type?: HTMLInputElement['type'] | undefined;
  value?: string | undefined;
  placeholder?: string | undefined;
  disabled?: boolean | undefined;
}

export type PageBuilderOptions = ElementBuilderOptions;

export type PageComponentOptions = PageBuilderOptions;

export interface FieldValidation {
  MIN_LENGTH?: number;
  MAX_LENGTH?: number;
  REGEX?: RegExp;
  DESCRIPTION?: string;
}

export interface FieldErrors {
  empty: (fieldId: string) => string;
  length: (fieldId: string, min: number, max: number) => string;
  format: (fieldId: string, description: string) => string;
}
