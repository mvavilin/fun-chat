export const NOTIFICATION = {
  TYPE: {
    INFO: 'info',
    ERROR: 'error',
    WARNING: 'warning',
    SUCCESS: 'success',
  },

  DURATION: 5000,
  ANIMATION_DELAY: 300,
  VISIBLE_DELAY: 10,
  EMOJI_MAP: {
    info: 'ℹ️',
    error: '❌',
    warning: '⚠️',
    success: '✅',
  },
} as const;
