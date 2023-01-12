import Link from "next/link";
import React from "react";
import Popup from "reactjs-popup";

export default function NewAssignment() {
  return (
    <>
      <Link href="/newAssignment">
        <div className="space-y-4 max-w-sm p-4">
          <div className="space-y-2">
            <img
              src="https://source.unsplash.com/random/480x360/"
              alt=""
              className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500 hover:scale-105"
            />
          </div>
        </div>
      </Link>
    </>
  );
}
