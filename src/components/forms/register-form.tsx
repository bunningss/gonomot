"use client";
import Link from "next/link";
import { useState } from "react";
import { FormInput } from "../form/form-input";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormModal } from "../form/form-modal";
import { messages } from "@/lib/constants";
import { postData } from "@/utils/api-methods";
import { errorNotification, successNotification } from "@/utils/toast";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string().min(3, {
      message: "Name must be at least 3 characters.",
    }),
    phone: z.string().min(11, {
      message: messages.invalidPhone,
    }),
    password: z.string().min(8, {
      message: messages.password.lengthError,
    }),
    confirmPassword: z.string().min(8, {
      message: messages.password.lengthError,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: messages.password.noMatch,
  });

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle register form submission
  const handleRegister = async (formData: FieldValues) => {
    try {
      setIsLoading(true);

      const { error, response } = await postData("auth/register", formData);
      if (error) return errorNotification(response.msg);

      router.push("/login");
      successNotification(response.msg);
    } catch (err) {
      errorNotification((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormModal
        formLabel="register"
        form={form}
        loading={isLoading}
        disabled={isLoading}
        onSubmit={handleRegister}
      >
        <FormInput
          form={form}
          placeholder="john doe"
          label="name / নাম"
          required
          name="name"
        />
        <FormInput
          form={form}
          placeholder="012345678912"
          label="Phone number / মোবাইল নম্বর"
          required
          name="phone"
        />
        <FormInput
          form={form}
          placeholder="********"
          label="Password / পাসওয়ার্ড"
          required
          name="password"
          type="password"
        />
        <FormInput
          form={form}
          placeholder="********"
          label="confirm Password / পাসওয়ার্ড নিশ্চিত করুন"
          required
          name="confirmPassword"
          type="password"
        />
      </FormModal>
      <span className="block text-mute mt-2">
        Already have an account?
        <Link href="/login" className="text-font font-bold hover:underline">
          {" "}
          Login.
        </Link>
      </span>
    </>
  );
}
