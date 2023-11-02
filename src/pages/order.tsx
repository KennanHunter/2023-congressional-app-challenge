import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";

const Order = () => {
  const { mutate } = api.post.createOrder.useMutation();

  const [errorText, setErrorText] = useState<string>();

  const options: { title: string; icon: string; price: number }[] = [
    {
      title: "Small Coffee",
      icon: "small-coffee.png",
      price: 300,
    },
    {
      title: "Medium Coffee",
      icon: "Med-Coffe.png",
      price: 350,
    },
    { title: "Large Coffee", icon: "large-coffee.png", price: 400 },
    {
      title: "Cake Pop (Singular)",
      icon: "Cake-pop.png",
      price: 100,
    },
    {
      title: "Lemon Loaf slice",
      icon: "Lemon_cake.png",
      price: 150,
    },
    {
      title: "Hot Chocolate",
      icon: "Hot-choc.png",
      price: 300,
    },
    {
      title: "Sparkling Water",
      icon: "Sparkling-Water",
      price: 50,
    },
    {
      title: "Sweet Tea",
      icon: "Sweet-tea.png",
      price: 250,
    },
    {
      title: "Croissant",
      icon: "Crossant.png",
      price: 200,
    },
    {
      title: "Croissant Basket (Contains 10)",
      icon: "Crossant-Basket.png",
      price: 1800,
    },
    {
      title: "Lemonade",
      icon: "Lemonade.png",
      price: 100,
    },
    {
      title: "Blueberry Muffin",
      icon: "Muffin.png",
      price: 125,
    },
    {
      title: "Oatmeal Raisin Cookie",
      icon: "Cookie.png",
      price: 100,
    },
    {
      title: "Blueberry Porridge",
      icon: "Porride.png",
      price: 200,
    },
    {
      title: "Honey Lemon Tea",
      icon: "Tea.png",
      price: 50,
    },
    {
      title: "Trail-Mix",
      icon: "Trail-Mix.png",
      price: 300,
    },
    {
      title: "Fruit Salad",
      icon: "Fruit-Salad.png",
      price: 300,
    },
  ];

  const [orderData, setOrderData] = useState<Record<string, number>>(
    options
      .map((value) => ({ title: value.title, quantity: 0 }))
      .reduce((prev, cur) => ({ ...prev, [cur.title]: cur.quantity }), {}),
  );

  const totalPrice = options.reduce(
    (prev, cur) => prev + cur.price * (orderData[cur.title] ?? 0),
    0,
  );

  const router = useRouter();

  return (
    <div className="grid place-content-center">
      {totalPrice > 0 ? (
        <h1>TotalPrice : {"$" + (totalPrice / 100).toFixed(2)}</h1>
      ) : (
        <h1>Select an item to see price</h1>
      )}
      <div className="flex flex-row flex-wrap justify-center gap-4 px-5">
        {options.map((el) => (
          <div className="m-3 flex flex-col justify-center rounded-lg border border-gray-600 p-1 align-middle ">
            <h2 className="px-2 py-1 pb-2">{el.title}</h2>
            <img
              className="h-20"
              src={el.icon}
              alt={"Preview of " + el.title}
            />
            <h3 className="text-center">{"$" + (el.price / 100).toFixed(2)}</h3>
            <div className="flex flex-row justify-center">
              <IconMinus
                className="hover:border-4"
                onClick={(e) => {
                  if ((orderData[el.title] ?? 0) == 0) return;

                  setOrderData({
                    ...orderData,
                    [el.title]: (orderData[el.title] ?? 0) - 1,
                  });
                }}
              />
              {orderData[el.title]}
              <IconPlus
                onClick={(e) => {
                  if ((orderData[el.title] ?? 0) == 20) return;

                  setOrderData({
                    ...orderData,
                    [el.title]: (orderData[el.title] ?? 0) + 1,
                  });
                }}
                className="hover:border-4"
              />
            </div>
          </div>
        ))}
      </div>
      <div>{errorText && <h1 className=" text-red-500">{errorText}</h1>}</div>
      <button
        onClick={(e) => {
          if (totalPrice === 0) {
            setErrorText("Please select an item first");
            return;
          }

          mutate({ orderData: JSON.stringify(orderData) });
          router.push("/thank_you");
        }}
        className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
      >
        Place Order
      </button>
    </div>
  );
};

export default Order;
