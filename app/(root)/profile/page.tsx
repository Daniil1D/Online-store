import { prisma } from "@/prisma/prisma-client";
import { ProfileForm } from "@/shared/components/shared";
import { getUserSession } from "@/shared/lib/get-user-session";
import { redirect } from "next/navigation";


export default async function Profilepage() {
    const session = await getUserSession();

    if (!session) {
        return redirect("/not-auth")
    }

    const user = await prisma.user.findFirst({ where: { id: Number(session?.id) }})

    if (!user) {
        return redirect("/not-auth")
    }
    
    return (
        <div>
            <ProfileForm data={user}/>
        </div>
    )
}