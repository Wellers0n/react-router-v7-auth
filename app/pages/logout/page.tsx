import type { Route } from "../../+types/root";
import { redirect } from "react-router";

export const action = async ({ request }: Route.LoaderArgs) => {
  
  return redirect("/login", {
    headers: {
      "Set-Cookie": "token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax",
    },
  });
};

export const loader = async ({ request }: Route.LoaderArgs) => {

  return redirect("/login", {
    headers: {
      "Set-Cookie": "token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax",
    },
  });
};
