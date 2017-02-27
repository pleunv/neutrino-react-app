import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';
import { useRouterHistory } from 'react-router';

export default function (useHashHistory = false) {
  return useHashHistory
    ? useRouterHistory(createHashHistory)({ queryKey: false })
    : useRouterHistory(createBrowserHistory)({ basename: '' });
}
