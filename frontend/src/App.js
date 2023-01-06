import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Username from "./components/Username";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Username></Username>
  },
  {
    path: "/reset",
    element: <Username></Username>
  },
  {
    path: "/register",
    element: <Username></Username>
  },
  {
    path: "/recovery",
    element: <Username></Username>
  },
  {
    path: "/profile",
    element: <Username></Username>
  },
  {
    path: "/password",
    element: <Username></Username>
  },
  {
    path: "*",
    element: <Username></Username>
  }
])


function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
