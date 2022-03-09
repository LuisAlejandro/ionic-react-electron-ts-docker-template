/**
 * Asynchronously loads the component for page
 */

import loadable from 'src/baseplate/loadable';
import LoadingIndicator from 'src/components/Spinner/Loadable';

export default loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
