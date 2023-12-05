import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createContext, useState } from "react";

import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Home from "./components/pages/dashboard/Home";
import Search from "./components/pages/dashboard/Search";
import CreatePost from "./components/pages/dashboard/CreatePost";
import Profile, { ProfileLoader } from "./components/pages/dashboard/Profile";
import Posts from "./components/pages/dashboard/Posts";
import SavedPosts from "./components/pages/dashboard/SavedPosts";
import EditProfile from "./components/pages/dashboard/EditProfile";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "create-post",
        element: <CreatePost />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
        loader: ProfileLoader,
        children: [
          {
            index: true,
            element: <Posts />,
          },
          {
            path: "saved-posts",
            element: <SavedPosts />,
          },
        ],
      },
      {
        path: "profile/:id/edit",
        element: <EditProfile />,
      },
    ],
  },
]);

const App = () => {
  const [userPfpUrl, setUserPfpUrl] = useState(localStorage.getItem("userPfpUrl"));

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ userPfpUrl, setUserPfpUrl }}>
        <RouterProvider router={router} />
      </AppContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export const AppContext = createContext();

export default App;
