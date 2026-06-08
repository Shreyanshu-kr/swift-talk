import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const displayName = selectedUser?.fullName || "User";

  const initials = displayName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="px-5 py-3 border-b border-slate-200 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
            {initials}
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">{displayName}</h3>

            <p className="text-sm text-slate-500">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setSelectedUser(null)}
          className="text-slate-500 hover:text-slate-900 transition"
        >
          <X size={22} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;