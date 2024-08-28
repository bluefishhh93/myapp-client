"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoaderButton } from "@/components/loader-button";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

interface ProfileNameFormProps {
  firstname: string;
  lastname: string;
  handleSubmit: (values: { firstname: string; lastname: string }) => Promise<void>;
}

const updateProfileNameSchema = z.object({
  firstname: z.string().min(1, "First name is required."),
  lastname: z.string().min(1, "Last name is required."),
});

export function ProfileNameForm({ firstname, lastname, handleSubmit }: ProfileNameFormProps) {
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();
  const { data: session, update, status } = useSession()


  const form = useForm<z.infer<typeof updateProfileNameSchema>>({
    resolver: zodResolver(updateProfileNameSchema),
    defaultValues: {
      firstname: firstname ?? "",
      lastname: lastname ?? "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof updateProfileNameSchema>> = async (values, event) => {
    startTransition(async () => {
      try {
        await handleSubmit(values);
        // Update session data after successful submission
        if (update) {
          console.log("Updating session data");
          await update({lastname: values.lastname, firstname: values.firstname});
        }
        toast({
          title: "Profile Updated",
          description: "First and last names updated successfully.",
        });
      } catch (error) {
        console.error("Profile update error:", error);
        toast({
          title: "Update Failed",
          description: "An error occurred while updating your profile.",
        });
      } finally {
        if (event) {
          const formElement = event.target as HTMLFormElement;
          formElement.reset(); // Reset form after submission
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-2 flex-1">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <LoaderButton isLoading={pending}>Save</LoaderButton>
      </form>
    </Form>
  );
}
