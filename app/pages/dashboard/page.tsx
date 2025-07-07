import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Route } from "./+types/page";
import { requireAuthToken } from "@/auth";
import Api from "@/lib/api";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const token = await requireAuthToken(request);

  const api = Api();

  const response = await api.get("/campanha", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const Dashboard = ({ actionData }: Route.ComponentProps) => {
  return (
    <div className="flex flex-col justify-center items-center p-10 h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Welcome to your dashboard!</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Your content goes here.</p>
        </CardContent>
        <CardFooter>
          <form action="logout" method="post">
            <Button type="submit" className="w-full">
              Logout
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
