import { LoginForm } from "@/components/login-form"
import img from "@/public/header.jpg"
export default function Page() {
  return (
    <div
      className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${img.src})` }}
    >
      <div className="w-full max-w-sm">
        <LoginForm  />
      </div>
    </div>
  );
}
