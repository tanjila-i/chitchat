import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import { useChatStore } from "../stores/useChatStore";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();
  return (
    <div className=" relative sm:w-[70%] w-[70%]  justify-center sm:max-x-6xl flex h-[600px]">
      {/*-------- left Side --------- */}
      <div className=" sm:w-[30%] w-full overflow-hidden shadow-2xl rounded-md flex flex-col">
        <ProfileHeader />
        <ActiveTabSwitch />

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === "chats" ? <ChatsList /> : <ContactList />}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-[#1d232a] shadow-2xl ">
        {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
      </div>
    </div>
  );
};

export default ChatPage;
