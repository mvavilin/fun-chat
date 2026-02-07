import { WS_CONFIG } from '@constants';
import { WSClient } from '@utils';

export const wsClient = new WSClient(WS_CONFIG.BASE_URL);
wsClient.connect();
