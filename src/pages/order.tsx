import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { orderOptions } from "~/orderOptions";
import { api } from "~/utils/api";

const Order = () => {
  const [errorText, setErrorText] = useState<string>();

  const [orderData, setOrderData] = useState<Record<string, number>>(
    orderOptions
      .map((value) => ({ title: value.title, quantity: 0 }))
      .reduce((prev, cur) => ({ ...prev, [cur.title]: cur.quantity }), {}),
  );

  const { mutate } = api.post.createOrder.useMutation();

  const router = useRouter();

  const totalPrice = orderOptions.reduce(
    (prev, cur) => prev + cur.price * (orderData[cur.title] ?? 0),
    0,
  );

  return (
    <div className="grid w-full place-content-center place-self-center lg:w-3/4">
      {totalPrice > 0 ? (
        <h1>TotalPrice : {"$" + (totalPrice / 100).toFixed(2)}</h1>
      ) : (
        <h1>Select an item to see price</h1>
      )}
      <div className="flex flex-row flex-wrap justify-center gap-4">
        {orderOptions.map((el) => (
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
