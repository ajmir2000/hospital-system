"use client";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Authenticated, ConvexReactClient, useMutation } from "convex/react";
import { ClerkProvider, useAuth, useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { api } from "@/convex/_generated/api";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>
          <UserSync />
        </Authenticated>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

function UserSync() {
  const { user } = useUser();
  const createUser = useMutation(api.patients.createUser);
  useEffect(() => {
    if (user) {
      createUser({
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress,
      });
    }
  }, [user, createUser]);

  return null;
}
export default ConvexClientProvider;
