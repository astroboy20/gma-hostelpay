import React from "react";
import { Logo } from "./logo";
import Link from "next/link";
import { Pulse } from "./animation";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="#features"
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Pulse>
            <Button
              asChild
              variant="outline"
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              <Link href="/auth/login">Login</Link>
            </Button>
          </Pulse>
          <Pulse>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/auth/register">Register</Link>
            </Button>
          </Pulse>
        </div>
      </div>
    </header>
  );
};

export { Header };
