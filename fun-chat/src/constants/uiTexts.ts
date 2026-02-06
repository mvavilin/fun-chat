import { capitalize } from '@utils';

const UI_TEXTS = {
  APP: {
    NAME: 'Fun Chat',
    LOGO_ALT: 'Chat Logo',
    FOOTER: `© ${new Date().getFullYear()}, The Rolling Scopes School`,
    AUTHOR: '@mvavilin',
    GITHUB_LINK: 'https://github.com/mvavilin',
    GITHUB_TEXT: 'GitHub',
  },

  PAGES: {
    LOGIN: {
      TITLE: 'Authentication',
      LOGIN_PLACEHOLDER: 'Enter your name',
      PASSWORD_PLACEHOLDER: 'Enter your password',
      BUTTON: 'Sign In',
      ERROR_EMPTY: (field: string): string => `${capitalize(field)} cannot be empty`,
      ERROR_EXISTS: 'User already exists',
      ERROR_INVALID: (field: string): string => `Invalid ${field} format`,
    },
    MAIN: {
      TITLE: 'Main Chat',
      ERROR_NO_USERS: 'No users available',
    },
    ABOUT: {
      TITLE: 'About',
      DESCRIPTION: 'A real-time chat application built for the RS School task.',
      AUTHOR: 'Author: @mvavilin',
      GITHUB: 'GitHub: mvavilin',
    },
    NOT_FOUND: '404 - Page not found',
    ERROR_LOADING: 'Failed to load page',
  },

  COMPONENTS: {
    HEADER: {
      WELCOME: 'Welcome,',
      LOGOUT: 'Log Out',
      ERROR_FETCH: 'Failed to load user data',
    },
    SIDEBAR: {
      USERS_TITLE: 'Users',
      SEARCH_PLACEHOLDER: 'Search users...',
      ONLINE: 'online',
      OFFLINE: 'offline',
      UNREAD_MESSAGES: 'unread',
      NO_USERS: 'No users found',
      ERROR_LOAD: 'Failed to load users',
    },
    CHAT: {
      SELECT_USER: 'Select a user to start chatting',
      BEGINNING: 'Beginning of the conversation',
      INPUT_PLACEHOLDER: 'Type a message...',
      INPUT_EMPTY_ERROR: 'Message cannot be empty',
      INPUT_TOO_LONG: 'Message is too long',
      SEND_BUTTON: 'Send',
      DELETE_MESSAGE: 'Delete',
      EDIT_MESSAGE: 'Edit',
      EDITED_LABEL: '(edited)',
      UNREAD_SEPARATOR: 'Unread messages',
      SCROLL_TO_NEW: 'New messages below',
      ERROR_SEND: 'Failed to send message',
      ERROR_EDIT: 'Failed to edit message',
      ERROR_DELETE: 'Failed to delete message',
      ERROR_HISTORY: 'Failed to load chat history',
      STATUS: {
        SENDING: 'Sending...',
        DELIVERED: 'Delivered',
        READ: 'Read',
      },
    },

    CONNECTION: {
      LOST: 'Connection lost. Reconnecting...',
      RESTORED: 'Connection restored',
      ERROR_RECONNECT: 'Reconnection failed',
    },

    ERRORS: {
      SERVER: 'Server error. Please try again.',
      NETWORK: 'Network error. Check your connection.',
      VALIDATION: 'Invalid input',
      UNAUTHORIZED: 'Authentication required',
      FORBIDDEN: 'Access forbidden',
      NOT_FOUND: 'Resource not found',
      TIMEOUT: 'Request timeout',
      UNKNOWN: 'Something went wrong',
    },
    BUTTONS: {
      OK: 'OK',
      CANCEL: 'Cancel',
      CLOSE: 'Close',
      CONFIRM: 'Confirm',
      SAVE: 'Save',
      EDIT: 'Edit',
      DELETE: 'Delete',
      BACK: 'Back',
      RETRY: 'Retry',
      REFRESH: 'Refresh',
      SEND: 'Send',
      LOGIN: 'Login',
      LOGOUT: 'Logout',
    },
    MODALS: {
      DELETE_TITLE: 'Delete message',
      DELETE_TEXT: 'Are you sure you want to delete this message?',
      EDIT_TITLE: 'Edit message',
      EDIT_TEXT: 'Edit your message:',
      ERROR_TITLE: 'Error',
      CONFIRM_TITLE: 'Confirm',
    },
  },
};

export default UI_TEXTS;
