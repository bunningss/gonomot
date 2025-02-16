"use client";
import Link from "next/link";
import { Container } from "./container";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { UserMenu } from "./user-menu";
import { UserDataProps } from "@/lib/types";

export const Navbar = ({ userData }: { userData: UserDataProps }) => {
  return (
    <nav className="shadow-regular md:shadow-none border-b border-muted sticky top-0 z-20 bg-background h-[66px]">
      <Container>
        <div className="flex items-center justify-between">
          <Logo />

          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <ThemeToggle />
            </div>
            {!userData?.error && (
              <Button icon="menu" className="lg:hidden" onClick={() => {}}>
                menu
              </Button>
            )}
            <div className="hidden md:flex gap-4 items-center">
              {userData?.error && (
                <Link href="/">
                  <Button>Login</Button>
                </Link>
              )}
              {!userData?.error && <UserMenu userData={userData} />}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};
