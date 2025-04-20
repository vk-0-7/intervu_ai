"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Brain, LogIn, Menu, UserPlus, X } from "lucide-react";

export const Navbar = ({ auth }: { auth: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  console.log(auth);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Intervu</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/interview"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Create Interview
            </Link>
            {!auth ? (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/sign-in" className="flex items-center gap-1">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/sign-up" className="flex items-center gap-1">
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/profile" className="flex items-center gap-1">
                    View Profile
                  </Link>
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="py-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/interview"
              className="py-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Create Interview
            </Link>
            <Link
              href="/sign-in"
              className="py-2 text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="py-2 text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <UserPlus className="h-4 w-4" />
              Sign Up
            </Link>
            <Button asChild className="w-full">
              <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
