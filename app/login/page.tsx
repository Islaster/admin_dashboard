import { signInWithOAuth } from "./actions";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-white p-6 text-gray-900">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Welcome Back</h1>

        {/* OAuth Buttons */}
        <div className="space-y-2">
          <form action={signInWithOAuth.bind(null, "google")}>
            <Button type="submit" className="w-full">
              Continue with Google
            </Button>
          </form>
          <form action={signInWithOAuth.bind(null, "github")}>
            <Button type="submit" variant="outline" className="w-full">
              Continue with GitHub
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
