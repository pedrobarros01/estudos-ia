import { ReactNode } from "react";

interface MenuCardProps {
    children: ReactNode
}

export default function MenuCard({children}: MenuCardProps){
    return (
        <ul className="bg-zinc-900 w-full rounded-md p-5 h-full">
            {children}
        </ul>
    );
}