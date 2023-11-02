import { IconCheck, IconMoodSmile } from "@tabler/icons-react";
import { useState } from "react";
import { api } from "~/utils/api";
import { useInterval } from "~/utils/useInterval";

const Counter = () => {
  const [completed, setCompleted] = useState<number[]>([]);

  const { data, isLoading, refetch } = api.post.getLatest.useQuery();
  const { mutate } = api.post.finishOrder.useMutation();

  useInterval(() => {
    refetch();
  }, 1000);

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
      <div className="flex flex-row flex-wrap justify-center gap-3 py-6">
        {data
          .filter((value) => !completed.includes(value.id))
          .map((value) => (
            <div className=" flex w-40 flex-col rounded bg-slate-200 p-4 align-middle ">
              <h1>Order {value.id}</h1>
              <ul>
                {Object.entries(JSON.parse(value.orderData))
                  .filter(([_, value]) => value !== 0)
                  .map(([key, value]) => (
                    <li className="ml-4 list-disc" key={key}>
                      {value + "x " + key}
                    </li>
                  ))}
              </ul>
              <div className="mt-auto place-self-center">
                <IconCheck
                  size={30}
                  onClick={() => {
                    console.log("Completed");
                    setCompleted([...completed, value.id]);
                    mutate({ id: value.id });
                    refetch();
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Counter;
