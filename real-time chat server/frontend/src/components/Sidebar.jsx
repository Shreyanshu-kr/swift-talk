import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 bg-[#111827] border-r border-slate-700 flex flex-col">
      <div className="p-5 border-b border-slate-700">
        <div className="flex items-center gap-3 text-slate-100">
          <Users className="size-6" />
          <span className="font-semibold hidden lg:block text-lg">
            Contacts
          </span>
        </div>

        <div className="mt-4 hidden lg:flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-sm"
          />

          <span className="text-sm text-slate-300">Show online only</span>

          <span className="text-xs text-slate-500">
            ({Math.max(onlineUsers.length - 1, 0)} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 py-3">
        {filteredUsers.map((user) => {
          const displayName = user.fullName || "User";

          const initials = displayName
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full px-4 py-3 flex items-center gap-4 transition
                hover:bg-[#1e293b]
                ${
                  selectedUser?._id === user._id
                    ? "bg-[#1e293b] border-l-4 border-blue-500"
                    : "border-l-4 border-transparent"
                }
              `}
            >
              <div className="relative mx-auto lg:mx-0">
                <div className="size-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  {initials}
                </div>

                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-[#111827]" />
                )}
              </div>

              <div className="hidden lg:block text-left min-w-0">
                <div className="font-semibold text-slate-100 truncate">
                  {displayName}
                </div>

                <div className="text-sm text-slate-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center text-slate-500 py-6">
            No online users
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;