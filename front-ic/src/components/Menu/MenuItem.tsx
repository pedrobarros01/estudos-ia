"use client"
import { IArvoreDeEstudos } from "@/app/page";
import Link from "next/link";
import { useState } from "react";
import { Menu } from ".";

interface MenuItemProps {
  nome: string;
  rota: string;
  filhos: Array<IArvoreDeEstudos> | null;
}

export default function MenuItem({ nome, rota, filhos}: MenuItemProps) {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <li
      className={`
        text-zinc-100 
        p-4 
        mb-3
        flex
        flex-col
        justify-end 
        items-end
        rounded-md
        ${isOpen ? "bg-red-900" : "hover:bg-red-900"}
        `}

        
    >
      {filhos && (<div className="w-full flex justify-start items-center">
        <span className={`font-bold ${isOpen ? "mb-3" : ""} h-full w-full hover:cursor-pointer `} onClick={toggleMenu} >{nome}</span>
      </div>)}

      {
      !filhos &&
      (<div className="w-full flex justify-between items-center">
        <Link href={rota}>{nome} </Link>
        <span>&gt;</span>
      </div>)
      }

      {filhos && isOpen && (<>
      <Menu.Card>
      {filhos.map((value, index) => {
          return <Menu.Item nome={value.nome} rota={rota + value.rota} filhos={value.estudos} key={index} />;
        })}
      </Menu.Card>
      </>)}

      
    </li>
  );
}
