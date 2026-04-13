import { useRef, useState } from "react";

import React from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { LogOutIcon } from "lucide-react";

const ProfileHeader = () => {
  const { authUser, logout, updateProfile } = useAuthStore();

  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handelImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };
  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex-1 items-center justify-center">
        <div className="flex items-center gap-3">
          {/* Avater */}
          <div className="avatar avatar-online">
            <button
              onClick={() => fileInputRef.current.click()}
              className="size-14 rounded-full overflow-hidden relative group"
            >
              <img
                src={selectedImg || authUser.profilePic || "/defaultImg.avif"}
                alt="default"
                className="size-full object-cover "
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-xs text-white">Change</span>
              </div>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handelImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
          {/* User Name & Online Text */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser.fullName}
            </h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>{" "}
          <div className="ml-5">
            {/* Logout Button */}
            <button
              className="text-slate-400 hover:text-slate-200 transition-colors"
              onClick={logout}
            >
              <LogOutIcon className="size-5 ml-20" />
            </button>
          </div>
        </div>
        {/* Button */}
      </div>
    </div>
  );
};

export default ProfileHeader;
