"use client";
import { SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { Stethoscope, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

function Header() {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/doctors",
      label: "Doctors",
    },
    {
      href: "/appointments",
      label: "My Appointments",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="border-b border-border/40 bg-background/80 dark:bg-background/95 backdrop-blur-md sticky top-0 z-50 shadow-sm dark:shadow-lg">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Stethoscope className="w-8 h-8 text-primary dark:text-primary/90" />
            <span className="text-xl font-bold text-foreground dark:text-foreground">
              MedCare
            </span>
          </Link>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary dark:hover:text-primary/90 relative",
                  pathname === link.href
                    ? "text-primary dark:text-primary after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-0.5 after:bg-primary dark:after:bg-primary/90"
                    : "text-muted-foreground dark:text-muted-foreground/80 hover:text-foreground dark:hover:text-foreground/90",
                )}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth buttons & Mobile menu button */}
          <div className="flex items-center space-x-4">
            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-2">
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <div className="flex items-center space-x-2">
                  <SignInButton mode="modal">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground dark:text-foreground">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-primary dark:bg-primary hover:bg-primary/90 dark:hover:bg-primary/90 text-primary-foreground dark:text-primary-foreground">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md hover:bg-accent dark:hover:bg-accent/50 transition-colors text-foreground dark:text-foreground"
              aria-label="Toggle mobile menu">
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 dark:border-border/60 bg-background/95 dark:bg-background/98 backdrop-blur-md">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Nav links */}
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary dark:hover:text-primary/90 py-2 px-3 rounded-md",
                      pathname === link.href
                        ? "text-primary dark:text-primary bg-primary/10 dark:bg-primary/20"
                        : "text-muted-foreground dark:text-muted-foreground/80 hover:text-foreground dark:hover:text-foreground/90 hover:bg-accent dark:hover:bg-accent/50",
                    )}>
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth */}
              <div className="pt-4 border-t border-border/40 dark:border-border/60">
                {isSignedIn ? (
                  <div className="flex items-center justify-center">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <SignInButton mode="modal">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-primary/20 dark:border-primary/30 text-foreground dark:text-foreground hover:bg-primary/10 dark:hover:bg-primary/20"
                        onClick={() => setIsMobileMenuOpen(false)}>
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full bg-primary dark:bg-primary hover:bg-primary/90 dark:hover:bg-primary/90 text-primary-foreground dark:text-primary-foreground"
                        onClick={() => setIsMobileMenuOpen(false)}>
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
