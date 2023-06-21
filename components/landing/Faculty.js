import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";

export default function Faculty({ event }) {
  // const events = event;
  console.log(event, "q");
  return (
    <Marquee>
      <div className="w-full h-[50rem] flex">
        {event.map((e,index) => {
          return (
            <div key={index} class="block mx-2 h-fit rounded-2xl bg-green-500 text-black shadow-md s shadow-black ">
              <div
                class="relative overflow-hidden bg-cover bg-no-repeat"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <img
                  class="rounded-t-xl w-[30rem] h-[17rem] object-cover
                "
                  src={e.link}
                  alt=""
                />
                <a href="#!">
                  <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                </a>
              </div>
              <div class="p-6">
                <h5 class="mb-2 text-xl font-medium leading-tight text-black">
                  {e.title}
                </h5>
                <p class="mb-4 text-base text-black">{e.disc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Marquee>

    //       {/* <marquee>
    //         {event.map((e) => {
    //           return (
    //             <>
    //               <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    //     <a href="#">
    //         <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
    //     </a>
    //     <div class="p-5">
    //         <a href="#">
    //             <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
    //         </a>
    //         <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    //         <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    //             Read more
    //             <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    //         </a>
    //     </div>
    // </div>
    //             </>
    //           );
    //         })}
    //       </marquee> */}
  );

  // <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
  //                 #date
  //               </span>
  //               <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
  //                 #house
  //               </span>
  //               <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
  //                 #team
  //               </span>
}
