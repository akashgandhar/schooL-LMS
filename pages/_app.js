import Head from "next/head";
import UserState from "../components/context/userState";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import NextNProgress from "nextjs-progressbar";
import { ExamProvider } from "./sessions/reexam/contexts/context";
import { SubjectProvider } from "./sessions/reexam/contexts/subContext";
import { MarkSheetProvider } from "./sessions/reexam/contexts/marksheetContext";

// import '../public/custom.js';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title> M J PUBLIC SCHOOL</title>
        <meta name="description" content="Created by akash gandhar" />
        <meta name="viewport" content="width=1024"></meta>
        <link rel="icon" href="/logot.png" />
      </Head>
      <UserState>
        <NextNProgress
          color="#fff"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
         {/* <Component {...pageProps} /> */}
        {/* under maintainance  */}
        {/* <div className="bg-red-500 text-white text-center p-3">
          <h1>Site under maintainance</h1>
        </div> */}
        <ExamProvider>
          <SubjectProvider>
            <MarkSheetProvider>
              <Component {...pageProps} />
            </MarkSheetProvider>
          </SubjectProvider>
        </ExamProvider>
      </UserState>
      <Analytics />
    </>
  );
}

export default MyApp;
