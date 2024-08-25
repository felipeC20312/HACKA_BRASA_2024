import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div>
      <LoginLink className="text-red-500">Sign in</LoginLink>
      <span className="text-">aaaa</span>
      <RegisterLink>Sign up</RegisterLink>
    </div>
  );
}