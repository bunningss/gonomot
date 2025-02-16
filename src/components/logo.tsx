import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <figure className="relative h-[50px] w-[150px]">
        <Image src="" alt="" className="cobject-contain" sizes="120px" fill />
      </figure>
    </Link>
  );
}
