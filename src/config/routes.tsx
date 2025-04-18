import { Navigate, RouteObject } from 'react-router-dom';
import App from '../App';
import ListRepo from 'pages/ListRepo/ListRepo';
import OneRepo from 'pages/OneRepo/OneRepo';
import Contributor from 'pages/Contributor/Contributor';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/repos',
        element: <ListRepo />,
      },
      {
        path: '/repos/:name',
        element: <OneRepo />,
      },
      {
        path: '/repos/:repoName/contributors/:username',
        element: <Contributor />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
