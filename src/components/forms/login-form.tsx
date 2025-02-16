"use client";
import Link from "next/link";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormModal } from "../form/form-modal";
import { FormInput } from "../form/form-input";
import { messages, siteSettings } from "@/lib/constants";
import { postData } from "@/utils/api-methods";
import { errorNotification, successNotification } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { setCookie } from "@/utils/cookie";

const formSchema = z.object({
  phone: z.string().min(11, {
    message: messages.invalidPhone,
  }),
  password: z.string().min(8, {
    message: messages.password.lengthError,
  }),
});

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const handleLoginForm = async (formData: FieldValues) => {
    try {
      setIsLoading(true);

      const { error, response } = await postData("auth/login", formData);
      if (error) return errorNotification(response.msg);

      await setCookie(siteSettings.cookieName, response.payload);
      router.refresh();
      successNotification(response.msg);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormModal
        form={form}
        formLabel="sign in"
        loading={isLoading}
        disabled={isLoading}
        onSubmit={handleLoginForm}
      >
        <FormInput
          placeholder="012345678912"
          label="Phone number"
          required
          name="phone"
          form={form}
        />
        <FormInput
          placeholder="********"
          type="password"
          label="Password"
          required
          name="password"
          form={form}
        />
      </FormModal>
      <div className="flex flex-col md:flex-row justify-between gap-2 mt-2">
        <Link href="/forgot-password" className="font-bold hover:underline">
          {" "}
          Forgot password?
        </Link>

        <span className="block text-mute">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold hover:underline">
            Sign up.
          </Link>
        </span>
      </div>
    </>
  );
}
