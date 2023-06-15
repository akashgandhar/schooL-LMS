import Head from "next/head";
import React from "react";
import Header from "../../components/landing/Header";
import Footer from "../../components/footer";
import Cbse from "../../components/cbse";

export default function index() {
  return (
    <>
      <Head>
        <title> M J PUBLIC SCHOOL</title>
        <meta name="description" content="Created by akash gandhar" />
        <meta name="viewport" content="width=1024"></meta>
        <link rel="icon" href="/LOGOT.png" />
      </Head>
      <div className="bg-gradient-to-r from-red-400 via-yellow-400 to-green-500">
        <div className="overflow-hidden top-0 fixed w-full z-[100]">
          <Header />
        </div>

        <div className="w-full flex flex-col items-center justify-center p-10 px-60">
          <div className="h-24"></div>
          <div className="flex w-full justify-between">
            <div className="flex w-full justify-center font-serif font-semibold text-7xl">
              Transfer Certificates Issued
            </div>
          </div>
          <div className="w-full flex justify-center p-10 h-auto">
            <iframe className="w-full h-[35rem] my-10" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTNCrecja3S2qzMFW7lD5a4kUlyZ1RdRjR4SVJqwzC50JdQnG02HmWUSGfNGitlwItqso6WP_PE2Fyr/pubhtml?gid=724662098&amp;single=true&amp;widget=true&amp;headers=false"></iframe>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
