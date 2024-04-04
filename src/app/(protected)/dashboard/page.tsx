"use client";

// import { useSession, signOut } from "next-auth/react";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function DashboardPage() {
  //   const session = useSession();
  const session = useCurrentUser();

  const onClick = () => {
    // signOut();
    logout();
  };

  return (
    <div>
      {/* <p>{JSON.stringify(session)}</p> */}

      <Button onClick={onClick}>Sign out</Button>
    </div>
  );
}
