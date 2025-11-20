import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import GuestPage from './pages/GuestPage';

const router = createBrowserRouter([
  {
    path:"/",
    element: <HomePage/>
  },
  {
    path:"/guest",
    element: <GuestPage/>
  },
  {
    path:"*",
    element: <NotFoundPage/>
  }
]);

const App = () => {
  return <RouterProvider router={router} />
}

export default App