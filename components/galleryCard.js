import React from "react";

export default function GalleryCard(link) {
  return (
    <div class="w-full max-w-sm bg-white border-2 border-gray-400 rounded-lg shadow ">
      <a href="#">
        <img
        
          class="p-8 rounded-xl"
          src={link}
          alt="product image"
        />
      </a>
      <div class="px-10 pb-5">
        <div class="flex items-center justify-between">
          <a
            href="#"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Edit
          </a>
          <a
            href="#"
            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Delete
          </a>
        </div>
      </div>
    </div>
  );
}
