import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Login from "./components/pages/auth/Login";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Home from "./components/pages/dashboard/Home";
import CreatePost from "./components/pages/dashboard/CreatePost";
import Messages from "./components/pages/dashboard/Messages";
import Profile from "./components/pages/dashboard/Profile";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
        path: "create-post",
        element: <CreatePost />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
