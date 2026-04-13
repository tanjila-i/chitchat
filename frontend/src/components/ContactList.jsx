import React, { useEffect } from "react";
import { useChatStore } from "../stores/useChatStore";
import { useAuthStore } from "../stores/useAuthStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";

const ContactList = () => {
  const { allContacts, isUserLoading, setSelectedUser, getAllContacts } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);
  if (isUserLoading) return <UserLoadingSkeleton />;
  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-[#1d232a] shadow-lg shadow-gray-950 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            {/* TODO:WORK NEED TO DO */}

            <div
              className={`avatar ${
                onlineUsers.includes(contact._id)
                  ? "avatar-online"
                  : "avatar-offline"
              } `}
            >
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/defaultImg.avif"} alt="" />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactList;
