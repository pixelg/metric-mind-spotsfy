import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthProfileContext } from "@/contexts/AuthProfileContext.tsx";
import { useContext } from "react";

export const ProfileAvatar = () => {
  const authProfileProps = useContext(AuthProfileContext);

  return authProfileProps && (
      <Avatar className="mt-4">
        <AvatarImage src={authProfileProps.profilePhoto || "https://github.com/shadcn.png"} /> { authProfileProps.userName }
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
}
