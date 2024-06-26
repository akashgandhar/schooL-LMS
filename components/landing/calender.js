import React, { useEffect, useState } from "react";
import "./App.css";
import { gapi } from "gapi-script";
import Event from "./components/Event.js";
 
function App() {
  const [events, setEvents] = useState([]);
 
  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const apiKey = "AIzaSyCVDZ_4XcpHC48dEZOK9AgIAT2bYe0qvt8";
  const accessToken = "203391537048-84hord2n2sdmnfp46vm67gro9c58c3pv.apps.googleusercontent.com"
 
  const getEvents = (calendarID, apiKey) => {
    function initiate() {
      gapi.client
        .init({
          apiKey: apiKey,
        })
        .then(function () {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          });
        })
        .then(
          (response) => {
            let events = response.result.items;
            setEvents(events);
          },
          function (err) {
            return [false, err];
          }
        );
    }
    gapi.load("client", initiate);
  };
 
  useEffect(() => {
    const events = getEvents(calendarID, apiKey);
    setEvents(events);
  }, []);
 
  return (
    <div className="App py-8 flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-4">
        React App with Google Calendar API!
        <ul>
          {events?.map((event) => (
            <li key={event.id} className="flex justify-center">
              <Event description={event.summary} />
            </li>
          ))}
        </ul>
      </h1>
    </div>
  );
}
 
export default App;