import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Stethoscope } from "lucide-react";

function Header() {
  const { isSignedIn } = useAuth();
  return (
    <nav className="bordeer-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-15 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" >
        <Stethoscope className="w-8 h-8" />
          <span>MedCare</span>
        </Link>

        <div className="hidden "></div>
      </div>
    </nav>
  );
}

export default Header;
