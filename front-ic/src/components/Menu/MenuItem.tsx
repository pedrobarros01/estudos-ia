import Link from "next/link";
import { ReactNode } from "react";

interface MenuItemProps {
    nome: string;
    rota: string

}

export default function MenuItem({nome, rota}: MenuItemProps){
    return (
        <li className="text-zinc-100 
        hover:cursor-pointer 
        p-4 
        flex 
        justify-between 
        items-center
        rounded-md
        hover:bg-red-900
        
        ">
            <Link href={rota}>{nome} </Link>
            <span>&gt;</span>
            
        </li>
    );
}