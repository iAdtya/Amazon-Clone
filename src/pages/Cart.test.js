import { render, screen } from "@testing-library/react";
import { ProductContext } from "../context/productContext";
import { Cart } from "../components/Cart";

test("renders Cart component and checks for undefined values", () => {
  render(
    <ProductContext>
      <Cart />
    </ProductContext>
  );

  // Add your assertions here
  // For example, you can check if the cart, total, itemInCart, and clearCart variables are not undefined
  expect(screen.getByTestId("cart")).not.toBeUndefined();
  expect(screen.getByTestId("total")).not.toBeUndefined();
  expect(screen.getByTestId("itemInCart")).not.toBeUndefined();
  expect(screen.getByTestId("clearCart")).not.toBeUndefined();
});
