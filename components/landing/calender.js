import React from 'react'
import ApiCalendar from "react-google-calendar-api";


export default function Calender() {
  const config = {
    clientId: "203391537048-84hord2n2sdmnfp46vm67gro9c58c3pv.apps.googleusercontent.com",
    apiKey: "AIzaSyCVDZ_4XcpHC48dEZOK9AgIAT2bYe0qvt8",
    scope: "https://www.googleapis.com/auth/calendar",
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    ],
  };
  
  const apiCalendar = new ApiCalendar(config);

  return (
    <div>Calender</div>
  )
}



