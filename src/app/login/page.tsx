import { AuthWrapper } from "@/components/auth-wrapper";
import { LoginForm } from "@/components/forms/login-form";

export default async function page() {
  return (
    <AuthWrapper title="লগইন করুন">
      <LoginForm />
    </AuthWrapper>
  );
}
