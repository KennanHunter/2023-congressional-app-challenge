import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const orderRouter = createTRPCRouter({
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.order.findMany({
      where: { complete: false },
      orderBy: { createdAt: "desc" },
    });
  }),
  createOrder: publicProcedure
    .input(z.object({ orderData: z.string() }))
    .mutation(({ input, ctx }) => {
      console.log("order placed");
      ctx.db.order
        .create({
          data: {
            complete: false,
            orderData: input.orderData,
          },
        })
        .then((val) => console.log(JSON.stringify(val, null, 4)));
    }),
  finishOrder: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input, ctx }) => {
      ctx.db.order.update({
        where: { id: input.id },
        data: { complete: true },
      });
    }),
});
