
import { IUser } from "@/interfaces/interfaces";


interface ChatHeaderProps {
  user: Partial<IUser> | null;
}

export function ChatHeader({ user }: ChatHeaderProps) {
   return (
     <div className="p-3 border-b flex items-center bg-white">
       <div className="relative">
         {user && (
           <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
             <span className="text-teal-700 font-medium">
               {user.name && user.name.charAt(0).toUpperCase()}
             </span>
           </div>
         )}
       </div>
       <div className="ml-3">
         {user && <h3 className="font-medium">{user.name && user.name}</h3>}
       </div>
     </div>
   );
}
