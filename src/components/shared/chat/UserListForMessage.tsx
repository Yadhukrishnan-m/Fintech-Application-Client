"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { IChatUser } from "@/interfaces/interfaces";


interface UserListProps {
  users: IChatUser[];
  onSelectUser: (user: IChatUser["user"]) => void;
  selectedUserId?: string;
}


export function UserListForMessage({
  users,
  onSelectUser,
  selectedUserId,
}: UserListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(users);
  

  return (
    <div className="w-full h-full flex flex-col border rounded-lg overflow-hidden bg-white">
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No users found</div>
        ) : (
         filteredUsers.map(({ user, last_message, last_message_at }) => (
  <div
    key={user._id}
    className={cn(
      "p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors",
      selectedUserId === user._id && "bg-gray-100"
    )}
    onClick={() => onSelectUser(user) }
  >
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
        <span className="text-teal-700 font-medium">
          {user.name.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="ml-3 flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{user.name}</h3>
          <span className="text-xs text-gray-500">
            {last_message_at ? new Date(last_message_at).toLocaleTimeString() : ""}
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-500 truncate max-w-[180px]">
            {last_message || "No messages yet"}
          </p>
          {/* {unread_messages > 0 && (
            <span className="text-xs text-white bg-blue-500 rounded-full px-2 py-0.5 ml-2">
              {unread_messages}
            </span>
          )} */}
        </div>
      </div>
    </div>
  </div>
))

        )}
      </div>
    </div>
  );
}
