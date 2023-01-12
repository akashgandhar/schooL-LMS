import { useRouter } from "next/router";
import React from "react";

export default function Header() {
  const router = useRouter();
  return (
    <div>
      <header className="p-4 ">
        <div className="container flex justify-between mx-auto">
          <a
            rel="noopener noreferrer"
            href="#"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            <img
              className="w-9 h-9"
              src="https://firebasestorage.googleapis.com/v0/b/assign-eefa5.appspot.com/o/Akash%20Gandhar%2FLOGOa.png?alt=media&token=0d48043a-f970-4495-b131-5f788bb00733"
            />
          </a>
          <a
            rel="noopener noreferrer"
            href="#"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            <span className="text-3xl font-bold ">M J PUBLIC SCHOOL</span>
          </a>
          <div className="flex items-center md:space-x-4">
            <button
              onClick={() => {
                router.push("/login");
              }}
              type="button"
              className="hidden px-6 py-2 font-semibold  lg:block bg-blue-600 rounded-lg hover:scale-105"
            >
              Log in
            </button>
          </div>
          <button
            onClick={() => {
              router.push("/login");
            }}
            title="Open menu"
            type="button"
            className="px-4  lg:hidden bg-blue-600 rounded-lg hover:scale-105"
          >
            Log in
          </button>
        </div>
      </header>
    </div>
  );
}
