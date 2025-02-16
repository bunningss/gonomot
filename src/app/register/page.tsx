import { AuthWrapper } from "@/components/auth-wrapper";
import { RegisterForm } from "@/components/forms/register-form";

export default async function page() {
  return (
    <AuthWrapper title="নতুন একাউন্ট খুলুন">
      <RegisterForm />
    </AuthWrapper>
  );
}
