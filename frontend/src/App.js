import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Password from "./components/Password";
import Username from "./components/Username";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import Register from "./components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Username></Username>
  },
  {
    path: "/reset",
    element: <Reset></Reset>
  },
  {
    path: "/register",
    element: <Register></Register>
  },
  {
    path: "/recovery",
    element: <Recovery></Recovery>
  },
  {
    path: "/profile",
    element: <Username></Username>
  },
  {
    path: "/password",
    element: <Password></Password>
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
