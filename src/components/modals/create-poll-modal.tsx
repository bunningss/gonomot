"use client";
import { useState } from "react";
import { Modal } from "./modal";
import { FormModal } from "../form/form-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { FormInput } from "../form/form-input";
import { postData } from "@/utils/api-methods";
import { errorNotification, successNotification } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { FormTextarea } from "../form/form-textarea";

const pollForm = z.object({
  title: z.string(),
  durationDays: z.coerce.number(),
  description: z.string(),
});

export function CreatePollModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(pollForm),
    defaultValues: {
      title: "",
      durationDays: 0,
      description: "",
    },
  });

  const handleSubmit = async (formData: FieldValues) => {
    try {
      setIsLoading(true);

      const { error, response } = await postData("polls", formData);
      if (error) return errorNotification(response.msg);

      form.reset();
      router.refresh();
      setIsModalOpen(false);
      successNotification(response.msg);
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="create poll"
      description="Create new poll."
      triggerLabel="create poll"
      className="w-fit"
      triggerIcon="plus"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
    >
      <FormModal
        form={form}
        formLabel="create"
        loading={isLoading}
        disabled={isLoading}
        onSubmit={handleSubmit}
      >
        <FormInput
          form={form}
          required
          name="title"
          label="Enter a descriptive title"
        />
        <FormInput
          form={form}
          required
          name="durationDays"
          label="Poll expires in (Number of days)"
        />
        <FormTextarea
          form={form}
          required
          name="description"
          label="Explain your cause."
        />
      </FormModal>
    </Modal>
  );
}
