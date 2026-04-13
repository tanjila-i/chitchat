import { useState } from "react";

import { LoaderIcon, MessageCircle, MessageCircleIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isSigningUp, signUp } = useAuthStore();

  const handelSubmit = (e) => {
    e.preventDefault();
    signUp(formData);
  };
  return (
    <div className="min-h-[90vh] flex items-center">
      <div className="flex flex-col sm:flex-row gap-8 items-center justify-center  m-auto   rounded-bl-2xl rounded-tr-2xl px-20 py-10 shadow-2xl">
        {/* ---------Left site---------- */}

        <div className="p-10">
          <form onSubmit={handelSubmit}>
            <div className="text-center flex gap-2 justify-center">
              <MessageCircleIcon className="w-8 h-8 mx-auto text-slate-400 mb-2" />{" "}
              <h1 className="text-center text-2xl mb-2  font-semibold text-gray-300">
                Create Account
              </h1>
            </div>{" "}
            <p className="text-slate-400 text-center">
              Sign up for a new account
            </p>
            <div className="pt-5">
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Enter FullName"
                className="placeholder:text-center placeholder:text-sm shadow-lg  w-full px-2 py-1 rounded hover:shadow-md hover:shadow-gray-950"
              />
            </div>
            <div className="pt-3">
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter Email"
                className="placeholder:text-center placeholder:text-sm shadow-lg  w-full px-2 py-1 rounded hover:shadow-md hover:shadow-gray-950"
              />
            </div>
            <div className="pt-3">
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter Password"
                className="placeholder:text-center placeholder:text-sm shadow-lg  w-full px-2 py-1 rounded hover:shadow-md hover:shadow-gray-950"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-5 shadow-lg text-center py-1 rounded text-gray-300 font-semibold  hover:shadow-md hover:shadow-gray-900"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <LoaderIcon className="w-full h-5 animate-spin text-center" />
              ) : (
                " Create Account"
              )}
            </button>{" "}
            <p className="text-center  mb-1 mt-5 text-gray-400">
              Have an account? {}
              <Link
                to="/login"
                className="font-semibold cursor-pointer hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>

        {/*-----------Right Site---------- */}

        <div className="hidden md:block lg:block p-10">
          <img src="/signup.png" alt="" className="size-30 text-white" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
