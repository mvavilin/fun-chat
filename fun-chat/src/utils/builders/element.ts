import type { ElementBuilderOptions, EventOptions } from '@types';

export default class ElementBuilder {
  private element: HTMLElement;

  constructor({
    tag = 'div',
    id,
    classes,
    content,
    attributes,
    styles,
    events,
    children,
  }: ElementBuilderOptions) {
    this.element = document.createElement(tag);

    if (id) this.id = id;
    if (classes) this.addClass(...classes);
    if (content) this.content = content;
    if (attributes) this.addAttribute(attributes);
    if (styles) this.addStyle(styles);
    if (events) this.addEvent(...events);
    if (children) this.addChild(...children);
  }

  public get id(): string {
    return this.element.id;
  }

  public set id(value: string) {
    this.element.id = value;
  }

  public addClass = (...classes: NonNullable<ElementBuilderOptions['classes']>): void =>
    this.element.classList.add(...classes);

  public removeClass = (...classes: NonNullable<ElementBuilderOptions['classes']>): void =>
    this.element.classList.remove(...classes);

  public replaceClass = (
    remove: NonNullable<ElementBuilderOptions['classes']>,
    add: NonNullable<ElementBuilderOptions['classes']>
  ): void => {
    this.removeClass(...remove);
    this.addClass(...add);
  };

  public hasClass = (className: string): boolean => this.element.classList.contains(className);

  public toggleClass = (...classes: NonNullable<ElementBuilderOptions['classes']>): void =>
    classes.forEach((className) => this.element.classList.toggle(className));

  public set content(value: string) {
    this.element.textContent = value;
  }

  public removeContent = (): void => {
    this.element.textContent = '';
  };

  public addAttribute = (attributes: NonNullable<ElementBuilderOptions['attributes']>): void =>
    Object.entries(attributes).forEach(([name, value]) => this.element.setAttribute(name, value));

  public removeAttribute = (...attributeNames: string[]): void =>
    attributeNames.forEach((name) => this.element.removeAttribute(name));

  public addStyle = (styles: Partial<CSSStyleDeclaration>): void => {
    for (const key in styles) {
      const value = styles[key];
      if (value) this.element.style[key] = value;
    }
  };

  public removeStyle = (...keys: (keyof CSSStyleDeclaration)[]): void =>
    keys.forEach((key) => this.element.style.removeProperty(String(key)));

  public addEvent = (...events: EventOptions[]): void =>
    events.forEach(({ type, handler, options = false }) =>
      this.element.addEventListener(type, handler, options)
    );

  public removeEvent = (...events: EventOptions[]): void =>
    events.forEach(({ type, handler, options = false }) =>
      this.element.removeEventListener(type, handler, options)
    );

  public addChild = (...children: ElementBuilder[]): void =>
    children.forEach((child) => this.element.appendChild(child.getElement()));

  public remove = (): void => this.element.remove();

  public getElement = (): HTMLElement => this.element;

  public getOffsetWidth = (): number => this.element.offsetWidth;

  public getChildCount = (): number => this.element.childElementCount;
}
