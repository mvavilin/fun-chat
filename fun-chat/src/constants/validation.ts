const VALIDATION = {
  LOGIN: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 16,
    REGEX: /^[a-zA-Z][a-zA-Z0-9]*$/,
    DESCRIPTION: 'starts with a letter, letters and numbers only',
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 32,
    REGEX: /^(?=.*[A-Za-z])(?=.*\d).+$/,
    DESCRIPTION: 'at least one letter and one number',
  },
};

Object.freeze(VALIDATION);

export default VALIDATION;
