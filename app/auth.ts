import { createCookie, redirect } from "react-router";

export const getCookies = (cookies: string, value: string) => {
  const cookieArray = cookies?.split("; ");
  const cookieObject: Record<string, string> = {};

  if (cookieArray) {
    for (const cookie of cookieArray) {
      const [key, value] = cookie.split("=");
      cookieObject[key] = value;
    }
  }

  return cookieObject[value];
};

export async function requireAuthToken(request: Request) {
  const cookies = request.headers.get("Cookie");

  if (!cookies) {
    throw redirect("/login", {
      headers: {
        "Set-Cookie": "token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax",
      },
    });
  }

  const token = getCookies(cookies, "token");

  if (!token) {
    throw redirect("/login", {
      headers: {
        "Set-Cookie": "token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax",
      },
    });
  }

  return token;
}
