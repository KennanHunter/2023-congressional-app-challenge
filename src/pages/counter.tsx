import { IconCheck, IconMoodSmile } from "@tabler/icons-react";
import { api } from "~/utils/api";

const Counter = () => {
  const { data, isLoading, refetch } = api.post.getLatest.useQuery();
  const { mutate } = api.post.finishOrder.useMutation();

  if (isLoading)
    return (
      <div className="grid place-content-center">
        <h1>Loading...</h1>
      </div>
    );

  if (!data || !data.length) {
    return (
      <div className="grid place-content-center">
        <div className="flex flex-row gap-1">
          <h1>No orders so far </h1>
          <IconMoodSmile />
        </div>
      </div>
    );
  }

  return (
    <div className="grid place-content-center">
      <div className="flex-column flex gap-3">
        {data.map((value) => (
          <div className="flex justify-center  rounded bg-slate-200 p-4 align-middle">
            <div>
              <h1>Order {value.id}</h1>
              {Object.entries(JSON.parse(value.orderData))
                .map(([key, value]) => value + "x " + key)
                .join(", ")}
            </div>
            <IconCheck
              onClick={() => {
                console.log("Completed");
                mutate({ id: value.id });
                refetch();
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Counter;
