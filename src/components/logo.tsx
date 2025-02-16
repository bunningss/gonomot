import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import { siteSettings } from "@/lib/constants";

export function Logo() {
  return (
    <Link href="/">
      <figure className="relative h-[50px] w-[150px] dark:invert-[1]">
        <Image
          src={logo}
          alt={siteSettings.siteName}
          className="cobject-contain"
          sizes="120px"
          fill
        />
      </figure>
    </Link>
  );
}
