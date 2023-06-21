import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";

export default function Faculty({ event }) {
  // const events = event;
  // console.log(event);
  return (
    <Marquee pauseOnHover>
      <div className="w-full  flex">
        {event.map((e, index) => {
          return (
            <div class="container mx-2">
              <div class="max-w-md w-full bg-gray-900 shadow-lg rounded-xl p-6">
                <div class="flex flex-col ">
                  <div class="">
                    <div class="relative h-62 w-full mb-3">
                      <div class="absolute flex flex-col top-0 right-0 p-3"></div>
                      <img
                        src={e.link}
                        alt="Image"
                        class=" w-full h-[17rem] object-cover rounded-2xl"
                      />
                    </div>
                    <div class="flex-auto justify-evenly">
                      <div class="flex flex-wrap ">
                        <div class="w-full flex-none text-sm flex items-center text-gray-600">
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 text-red-500 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg> */}
                          {/* <span class="text-gray-400 whitespace-nowrap mr-3">
                            4.60
                          </span> */}
                          {/* <span class="mr-2 text-gray-400">India</span> */}
                        </div>
                        <div class="flex items-center w-full justify-between min-w-0 ">
                          <h2 class="text-lg mr-auto cursor-pointer text-gray-200 hover:text-purple-500  ">
                            Lorem ipsum is placeholder text commonly used in the
                            graphic
                          </h2>
                          {/* <div class="flex items-center bg-green-400 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                            INSTOCK
                          </div> */}
                        </div>
                      </div>
                      {/* <div class="text-xl text-white font-semibold mt-1">
                        $240.00
                      </div> */}
                      <div class="lg:flex  py-4  text-sm text-gray-600">
                        <div class="flex-1 inline-flex items-center  mb-3">
                          <div class="w-full flex-none text-sm flex items-center text-gray-600"></div>
                        </div>
                      </div>
                      <div class="flex space-x-2 text-sm font-medium justify-start">
                        <button class="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 ">
                          <span>View</span>
                        </button>
                        {/* <button class="transition ease-in duration-300 bg-gray-700 hover:bg-gray-800 border hover:border-gray-500 border-gray-700 hover:text-white  hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class=""
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
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
