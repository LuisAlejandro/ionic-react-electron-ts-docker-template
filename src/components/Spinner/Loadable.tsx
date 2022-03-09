/**
 * Asynchronously loading the spinner component
 */

import loadable from 'src/baseplate/loadable';

export default loadable(() => import('./index'), {
  fallback: <div style={{ position: 'fixed', top: '50%', left: '50%'}}>Loading...</div>
});
