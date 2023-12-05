import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext"; // replace with your actual path
import { Home } from "./pages/Home"; // replace with your actual path
import { SignIn } from "./pages/SignIn"; // replace with your actual path
import { SignUp } from "./pages/SignUp";
import { Error } from "./pages/Error"; // replace with your actual path
import { ProductContext } from "./context/productContext";
import { Cart } from "./pages/Cart";
import { MyOrder } from "./pages/MyOrder";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/signIn",
          element: <SignIn />,
        },
        {
          path: "/signUp",
          element: <SignUp />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/myorder",
          element: <MyOrder />,
        },
      ],
    },
  ]);
  return (
    <AuthContext>
      <ProductContext>
        <RouterProvider router={router} />
      </ProductContext>
    </AuthContext>
  );
}

export default App;
