import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Route } from "./+types/page";
import { redirect, useFetcher } from "react-router";
import { Loading } from "@/components/ui/loading";
import Api from "@/lib/api";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import z from "zod";
import { getCookies } from "@/auth";

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const api = Api();
  const response = await api.post("/auth/sign-in", {
    email,
    password,
  });

  return redirect("/", {
    headers: {
      "Set-Cookie": `token=${response.data}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=54000`, // 15 hours
    },
  });
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const cookies = request.headers.get("Cookie");

  if (cookies) {
    const token = getCookies(cookies, "token");

    if (token) {
      return redirect("/");
    }
  }

  return null;
};

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Login = ({ actionData }: Route.ComponentProps) => {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  const fetcher = useFetcher();

  const isLoading = fetcher.state !== "idle";

  return (
    <div className="flex flex-col justify-center items-center p-10 h-screen">
      <Tabs defaultValue="login" className="w-[400px] mt-[-50px]">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <fetcher.Form {...getFormProps(form)} method="POST">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Controle sua agenda de forma simples, faça o login para mudar
                  o jogo.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label className="flex gap-1">
                    Email <p className="text-red-600">*</p>
                  </Label>
                  <Input
                    placeholder="example@mail.com"
                    {...getInputProps(fields.email, { type: "email" })}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="flex gap-1">
                    Senha <p className="text-red-600">*</p>
                  </Label>
                  <Input
                    {...getInputProps(fields.password, { type: "password" })}
                    placeholder="***"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  <Loading isLoading={isLoading}>Entrar</Loading>
                </Button>
              </CardFooter>
            </Card>
          </fetcher.Form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
