import { getUser } from "@/app/lib/auth";
import Image from "next/image";

export function Profile() {
  const { name, avatarUrl } = getUser();

  return (
    <div className="flex items-center gap-3 text-left">
      <Image src={avatarUrl} alt={`Imagem de ${name}`} width={48} height={48} className="w-10 h-10 rounded-full" />

      <p className="text-sm leading-snug max-w-[150px]">
        {name}
        <a href="" className="block text-red-400 hover:text-red-300">Quero sair</a>
      </p>
    </div>
  )
}