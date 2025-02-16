"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Icon } from "./icon";
import { useRouter } from "next/navigation";

export function UserMenu({ userData }: { userData: UserDataProps }) {
  const router = useRouter();

  const isAllowed: boolean = false;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src=""
            alt={
              userData?.payload?.name
                ? (userData.payload?.name as string)
                : "profile image placeholder"
            }
          />
          <AvatarFallback>IL</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[10rem]">
        <DropdownMenuLabel className="capitalize">
          {(userData?.payload?.name as string) || ""}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userData?.error !== undefined && !userData.error && (
          <>
            <Link passHref href="/dashboard" className="w-full">
              <DropdownMenuItem className="capitalize flex justify-between items-center">
                <span>profile</span>
                <Icon size={22} name="user" />
              </DropdownMenuItem>
            </Link>
          </>
        )}
        {isAllowed && (
          <Link href="/dashboard" passHref prefetch={true}>
            <DropdownMenuItem className="capitalize flex justify-between items-center">
              <span>dashboard</span>
              <Icon size={22} name="layout-dashboard" />
            </DropdownMenuItem>
          </Link>
        )}
        {!userData?.error && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="capitalize flex justify-between items-center"
              onClick={async () => {
                router.refresh();
              }}
            >
              <span>logout</span>
              <Icon name="log-out" size={22} />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
