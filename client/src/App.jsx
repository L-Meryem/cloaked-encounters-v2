import React, { useEffect, useState } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';


import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import GuestPage from './pages/GuestPage';
import { UserProvider, useUser } from './context/UserContext';


const RequireAuth = ({ children }) => {
  const {userName, loading} = useUser();

  if (loading) return <div>Loading...</div>;
  if (!userName) return <Navigate to="/guest" replace />;
  return children;
};


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RequireAuth>
          <HomePage/>
        </RequireAuth>
      )
    },
    {
      path: "/guest",
      element: <GuestPage />
    },
    {
      path: "*",
      element: <NotFoundPage />
    }
  ]);


  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App