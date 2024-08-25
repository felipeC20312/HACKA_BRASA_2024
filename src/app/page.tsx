import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <div className="h-64 flex flex-col mt-20 items-center justify-center">
        <h1 className="text-4xl text-center text-white font-bold">CrossFi</h1>
      </div>
      <Card className="bg-transparent border-none shadow-sm shadow-white mt-20">
        <CardHeader className="text-center">
          <span className="text-xl font-bold text-slate-100">Área de Acesso</span>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-4 min-w-64 h-auto pb-8">
          <LoginLink>
            <Button className="w-full ">
              Sign In
            </Button>
          </LoginLink>
          <RegisterLink>
            <Button className="w-full">
              Sign Up
            </Button>
          </RegisterLink> 
        </CardContent>
      </Card>
    </div>
  );
}