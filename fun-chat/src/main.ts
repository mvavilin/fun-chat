import '@styles/index.scss';

import { ElementBuilder } from '@utils';
import Router from '@/router';

document.addEventListener('DOMContentLoaded', () => {
  const app = new ElementBuilder({ id: 'app' });
  document.body.appendChild(app.getElement());

  const router = new Router(app.id);
  router.init();
});
