import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options) {
          response.cookies.set(name, value, options);
        },
        remove(name: string, options) {
          response.cookies.set(name, "", {
            ...options,
            maxAge: -1,
          });
        },
      },
    }
  );

  // Instead of getUser, get the session
  const { data: { session } } = await supabase.auth.getSession();
  
  // Only log the error if we're trying to access a protected route
  // and there's no session
  console.log("✅ Middleware session:", session ? "active" : "null");

  return response;
}