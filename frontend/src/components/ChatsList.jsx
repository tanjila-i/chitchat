import React, { useEffect } from "react";
import { useChatStore } from "../stores/useChatStore";
import { useAuthStore } from "../stores/useAuthStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
// import NoChatsFound from "./NoChatsFound";

const ChatsList = () => {
  const { chats, isUserLoading, setSelectedUser, getMyChatPartners } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUserLoading) return <UserLoadingSkeleton />;
  //   if (chats.length === 0) return <NoChatsFound />;
  return (
    <>
      {chats.map((chat) => (
        <div
          className="bg-[#1d232a] p-4 shadow-lg shadow-gray-950 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          key={chat._id}
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            {/* TODO:WORK NEED TO DO */}
            <div
              className={`avatar ${
                onlineUsers.includes(chat._id)
                  ? "avatar-online"
                  : "avatar-offline"
              } `}
            >
              <div className="size-12 rounded-full">
                <img src={chat.profilePic || "/defaultImg.avif"} alt="" />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">
              {chat.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatsList;
