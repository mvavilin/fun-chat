import type { FieldValidation, FieldErrors } from '@types';
import { InputBuilder } from '@utils';
import { UI_TEXTS } from '@constants';

export const isFieldValid = (
  fieldComponent: InputBuilder,
  validation: FieldValidation,
  errors: FieldErrors = {
    empty: UI_TEXTS.PAGES.LOGIN.ERROR_EMPTY,
    length: UI_TEXTS.PAGES.LOGIN.ERROR_LENGTH,
    format: UI_TEXTS.PAGES.LOGIN.ERROR_FORMAT,
  }
): boolean => {
  const input = fieldComponent.getInput();
  if (input === null) return false;

  const { MIN_LENGTH, MAX_LENGTH, REGEX, DESCRIPTION } = validation;

  let isValid = false;

  switch (true) {
    case fieldComponent.isEmpty():
      input.setCustomValidity(errors.empty(fieldComponent.id));
      break;

    case MIN_LENGTH !== undefined &&
      MAX_LENGTH !== undefined &&
      !fieldComponent.hasLengthBetween(MIN_LENGTH, MAX_LENGTH):
      input.setCustomValidity(errors.length(fieldComponent.id, MIN_LENGTH, MAX_LENGTH));
      break;

    case REGEX && !fieldComponent.isValidByRegex(REGEX):
      if (DESCRIPTION) input.setCustomValidity(errors.format(fieldComponent.id, DESCRIPTION));
      break;

    default:
      isValid = true;
      input.setCustomValidity('');
      break;
  }

  if (isValid) {
    fieldComponent.removeClass('invalid');
  } else {
    fieldComponent.addClass('invalid');
  }
  input.reportValidity();

  return isValid;
};
