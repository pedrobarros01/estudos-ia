import { ReactNode } from "react";

interface NavbarHeaderProps {
    children : ReactNode
}

export default function NavbarHeader({children}: NavbarHeaderProps){
    return (
        <header className="bg-red-900 text-zinc-100 py-2 sticky top-0 h-14">
            <nav className="w-full flex justify-start items-center">
                {children}
            </nav>
        </header>
    );    
}