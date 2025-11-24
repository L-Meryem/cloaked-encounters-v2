import React, { useEffect, useState } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';


import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import GuestPage from './pages/GuestPage';


const RequireAuth = ({ userName, loading, children }) => {
  if (loading) return <div>Loading...</div>;
  if (!userName) return <Navigate to="/guest" replace />;
  return children;
};


const App = () => {
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true); // waith for the fetch before render

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        const data = await res.json();

        if (data.success) {
          setUserName(data.user.userName);
          console.log(data.user.userName);
        }
        else
          setUserName(null);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    }
    fetchUser();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RequireAuth userName={userName} loading={loading}>
          <HomePage userName={userName} setUserName={setUserName} />
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


  return <RouterProvider router={router} />
}

export default App