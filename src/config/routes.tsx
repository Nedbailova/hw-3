import { Navigate, RouteObject } from 'react-router-dom';
import App from '../App';
import ListRepo from '../pages/ListRepo/ListRepo';
import OneRepo from '../pages/OneRepo/OneRepo';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/Repos',
        element: <ListRepo />,
      },
      {
        path: '/Repos/:name',
        element: <OneRepo />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
