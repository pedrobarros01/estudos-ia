import { ReactNode } from "react";

interface TitleProps {
    children: ReactNode;
}

export default function Title({children}: TitleProps){
    return (
        <h1 className='text-zinc-100 font-bold text-xl ml-4 mt-4'>{children}</h1>
    );
}