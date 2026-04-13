import React from "react";
import { useChatStore } from "../stores/useChatStore";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div className="bg-transparent p-2 text-center  justify-center gap-3">
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab px-10 py-1.5 ${
          activeTab === "chats"
            ? "bg-[#212831] rounded-lg shadow-lg shadow-gray-950"
            : "text-slate-400"
        }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab px-10 py-1.5 ${
          activeTab === "contacts"
            ? "bg-[#212831] rounded-lg shadow-lg shadow-gray-950"
            : "text-slate-400"
        }`}
      >
        Contacts
      </button>
    </div>
  );
};

export default ActiveTabSwitch;
