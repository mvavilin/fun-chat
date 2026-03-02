import { SERVER_ERRORS, NOTIFICATION } from '@constants';
import { Notification } from '@components/ui';

export function getErrorMessage(error: unknown, fallback = SERVER_ERRORS.INTERNAL_ERROR): string {
  return error instanceof Error ? error.message : fallback;
}

export function showErrorNotification(error: unknown, fallback = SERVER_ERRORS.INTERNAL_ERROR): void {
  new Notification(getErrorMessage(error, fallback), NOTIFICATION.TYPE.ERROR);
}
