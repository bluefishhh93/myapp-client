"use server";
import { rateLimitByIp } from "@/lib/limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { redirect } from "next/navigation";
import { registerUserUseCase } from "@/use-case/authorizations";
import { z } from "zod";

export const signUpAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    })
  )
  .handler(async ({ input }) => {
    await rateLimitByIp({ key: "register", limit: 3, window: 30000 });
    const user = await registerUserUseCase(input.email, input.password);
    return redirect("/sign-in");
  });
