import { ReactNode } from "react";

interface NavbarHeaderProps {
  children: ReactNode;
}

export default function NavbarHeader({ children }: NavbarHeaderProps) {
  return (
    <header className="bg-red-900 text-zinc-100 py-2 fixed w-full top-0 h-14 z-50">
      <nav className="w-full flex justify-start items-center">{children}</nav>
    </header>
  );
}
