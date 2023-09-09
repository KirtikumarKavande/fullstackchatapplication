import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Form from "./components/Form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatHome from "./components/ChatHome";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Form />,
    },
    {
      path: "/chat",
      element: <ChatHome />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />

      <ToastContainer />
    </>
  );
}
