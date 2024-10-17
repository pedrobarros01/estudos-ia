import Link from "next/link";

interface NavbarLinkProps {
    titulo: string;
    rota: string;
}

export default function NavbarLink({titulo, rota}: NavbarLinkProps){
    return(
        <Link className="ml-2 hover:text-zinc-100 hover:bg-zinc-900 p-2 rounded-2xl" href={rota}>{titulo}</Link>
    );    
}