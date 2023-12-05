import { useProductContext } from "../context/productContext";

export function CartItem(props) {
  const { name, image, price, category, quantity } = props.product;
  const { removeFromCart, increaseQuant, decreaseQuant } = useProductContext();

  return (
    <>
      <div className="bg-white shadow-md rounded-3xl p-2 grid grid-cols-3 gap-2 w-3/4 mx-auto">
        <div className="col-span-1">
          <img
            src={image}
            alt={category}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="col-span-2 space-y-4">
          <div className="font-bold text-lg">{name}</div>
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">₹{price}</div>
            <div className="flex space-x-2 items-center">
              <span className="text-gray-500 cursor-pointer">
                <i
                  className="fa-solid fa-circle-minus"
                  onClick={() => decreaseQuant(props.product)}
                ></i>
              </span>
              <span> {quantity} </span>
              <span className="text-gray-500 cursor-pointer">
                <i
                  className="fa-solid fa-circle-plus"
                  onClick={() => increaseQuant(props.product)}
                ></i>
              </span>
            </div>
          </div>
          <div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => removeFromCart(props.product)}
            >
              Remove From Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
