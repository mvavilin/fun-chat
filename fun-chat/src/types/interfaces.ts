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

export interface InputBuilderOptions extends ElementBuilderOptions {
  type?: HTMLInputElement['type'] | undefined;
  value?: string | undefined;
  placeholder?: string | undefined;
  disabled?: boolean | undefined;
}

export type PageBuilderOptions = ElementBuilderOptions;

export type PageComponentOptions = PageBuilderOptions;
