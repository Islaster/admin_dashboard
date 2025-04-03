// middleware.ts
import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}
export const config = {
    matcher: [
      /*
        Match all paths EXCEPT the following:
        - starts with /_next
        - starts with /favicon.ico
        - starts with /auth/callback
      */
      '/((?!_next/|favicon.ico|auth/callback).*)',
    ],
  }
