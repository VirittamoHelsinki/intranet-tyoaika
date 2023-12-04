





// import React, { useState, useEffect } from "react";
// import { getHHMMSS, getHHMM } from "../features/functions";
// import { weekdays } from "../features/arrays";
// import "../styles/WorkHourPage.scss";
// import "../styles/MainPage.scss";

// const WorkHourPage = () => {
//   const [time, setTime] = useState(getHHMMSS());
//   const [arrival, setArrival] = useState(null);
//   const [departure, setDeparture] = useState(null);
//   const [name, setName] = useState(""); // New state for the name
//   const [workTimes, setWorkTimes] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalText, setModalText] = useState("");
//   const [modalTime, setModalTime] = useState(new Date());

//   // Update the clock time every second
//   useEffect(() => {
//     const interval = setInterval(() => setTime(getHHMMSS()), 1000);
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   // Fetch work times from the backend when the component mounts
//   useEffect(() => {
//     const fetchWorkTime = async () => {
//       try {
//         const response = await fetch('http://localhost:5555/api/worktimes');

//         if (response.status === 200) {
//           const data = await response.json();
//           setWorkTimes(data);

//           // Find the most recent arrival and departure entries and set them
//           const latestArrival = data.find(entry => entry.arrival);
//           const latestDeparture = data.find(entry => entry.departure);
//           if (latestArrival) {
//             setArrival(new Date(latestArrival.arrival));
//           }
//           if (latestDeparture) {
//             setDeparture(new Date(latestDeparture.departure));
//           }
//         } else {
//           console.error('Error fetching work times');
//         }
//       } catch (error) {
//         console.error('Error while making the request:', error);
//       }
//     };

//     fetchWorkTime();
//   }, []);

//   // Function to save the arrival time to the backend and update the state
//   const saveArrival = async () => {
//     try {
//       const response = await fetch('http://localhost:5555/api/worktimes/arrival', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, arrival: new Date() }), // Include the name
//       });

//       if (response.status === 200) {
//         const data = await response.json();
//         console.log('Arrival time saved with ID:', data.id);

//         // Update the arrival state
//         setArrival(new Date());
//       } else {
//         console.error('Error saving arrival time');
//       }
//     } catch (error) {
//       console.error('Error while making the request:', error);
//     }
//   };

//   // Function to save the departure time to the backend and update the state
//   const saveDeparture = async () => {
//     if (!arrival) {
//       console.error('Arrival time is missing. Please save arrival time first.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5555/api/worktimes/departure', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, departure: new Date() }), // Include the name
//       });

//       if (response.status === 200) {
//         console.log('Departure time saved');

//         // Update the departure state
//         setDeparture(new Date());
//       } else {
//         console.error('Error saving departure time');
//         alert('Error: Unable to save departure time. Please try again later.');
//       }
//     } catch (error) {
//       console.error('Error while making the request:', error);
//       alert('An error occurred while saving the departure time. Please try again later.');
//     }
//   };



//working version

import React, { useState, useEffect } from "react";
import { getHHMMSS, getHHMM } from "../features/functions";
import { weekdays } from "../features/arrays";
import "../styles/WorkHourPage.scss";
import "../styles/MainPage.scss";

const WorkHourPage = () => {
  const [time, setTime] = useState(getHHMMSS());
  const [arrival, setArrival] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [name, setName] = useState(""); // New state for the name
  const [workTimes, setWorkTimes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTime, setModalTime] = useState(new Date());

  // Update the clock time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(getHHMMSS()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Fetch work times from the backend when the component mounts
  useEffect(() => {
    const fetchWorkTime = async () => {
      try {
        const response = await fetch('http://localhost:5555/api/worktimes');

        if (response.status === 200) {
          const data = await response.json();
          setWorkTimes(data);

          // Find the most recent arrival and departure entries and set them
          const latestArrival = data.find(entry => entry.arrival);
          const latestDeparture = data.find(entry => entry.departure);
          if (latestArrival) {
            setArrival(new Date(latestArrival.arrival));
          }
          if (latestDeparture) {
            setDeparture(new Date(latestDeparture.departure));
          }
        } else {
          console.error('Error fetching work times');
        }
      } catch (error) {
        console.error('Error while making the request:', error);
      }
    };

    fetchWorkTime();
  }, []);

  // Function to save the arrival time to the backend and update the state
  const saveArrival = async () => {
    try {
      const response = await fetch('http://localhost:5555/api/worktimes/arrival', {
        method: 'POST', // Change this to 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, arrival: new Date() }), // Include the name
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log('Arrival time saved with ID:', data.id);

        // Update the arrival state
        setArrival(new Date());
      } else {
        console.error('Error saving arrival time');
      }
    } catch (error) {
      console.error('Error while making the request:', error);
    }
  };

  // Function to save the departure time to the backend and update the state
  const saveDeparture = async () => {
    if (!arrival) {
      console.error('Arrival time is missing. Please save arrival time first.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5555/api/worktimes/departure', {
        method: 'PUT', // Change this to 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, departure: new Date() }), // Include the name
      });

      if (response.status === 200) {
        console.log('Departure time saved');

        // Update the departure state
        setDeparture(new Date());
      } else {
        console.error('Error saving departure time');
        alert('Error: Unable to save departure time. Please try again later.');
      }
    } catch (error) {
      console.error('Error while making the request:', error);
      alert('An error occurred while saving the departure time. Please try again later.');
    }
  };

  return (
    <div className="mainpage">
      <div className="workhour-content">
        <div className="date-buttons-content">
          <div className="date-column">
            <div className="date-label">
              <label>{new Date().toLocaleDateString("fi-FI", { weekday: "long", year: "numeric", month: "numeric", day: "numeric" })}</label>
            </div>
            <div className="time-label">
              <label>{time}</label>
            </div>
          </div>
          <div className="button-column">
            {/* Add an input field for the name */}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div
              className="time-button"
              onClick={() => {
                setModalText("Olet kirjautunut sisään!");
                setModalTime(new Date());
                saveArrival(); // Save arrival time and update the state
                setShowModal(true);
              }}
            >
              Sisään
            </div>
            <div
              className="time-button"
              onClick={() => {
                setModalText("Olet kirjautunut ulos!");
                setModalTime(new Date());
                saveDeparture(); // Save departure time and update the state
                setShowModal(true);
              }}
            >
              Ulos
            </div>
          </div>
        </div>
        <div className="right-side-main">
          <div className="times-content">
            <div className="previous-content">
              <div className="previous-label">
                <p>Aiemmat työaikakirjaukset</p>
              </div>
              <div className="previous-data">
                <div className="data-row title" key="title">
                  <div className="day-date-label">
                    <label>PÄIVÄMÄÄRÄ</label>
                  </div>
                  <label>SISÄÄN</label>
                  <label>ULOS</label>
                </div>
                {workTimes.slice(-6).map((data, index) => (
                  <div className={`data-row ${index % 2 === 1 && "odd"}`} key={index}>
                    <div className="day-date-label">
                      <label>{weekdays[new Date(data.arrival).getDay()]}</label>
                      <label>
                        {new Date(data.arrival).getDate()}.{new Date(data.arrival).getMonth() + 1}
                      </label>
                    </div>
                    <label>{getHHMM(new Date(data.arrival))}</label>
                    {data.departure ? <label>{getHHMM(new Date(data.departure))}</label> : <label className="empty-label" />}
                  </div>
                ))}
              </div>
            </div>
            <div className="working-time-content">
              <div className="label-stamp-box-content">
                <label className="title-label">Sisään:</label>
                <label className="stamp-box-label">{arrival && getHHMMSS(new Date(arrival))}</label>
              </div>
              <div className="label-stamp-box-content">
                <label className="title-label">Ulos:</label>
                <label className="stamp-box-label">{departure && getHHMMSS(new Date(departure))}</label>
              </div>
            </div>
          </div>
        </div>
        {showModal && (
          <div className="modal transparent-background">
            <div className="modal">
              <div className="modal-container">
                <div className="modal-text-content">
                  <div className="text-label">
                    <label>{modalText}</label>
                  </div>
                  <div className="description-label">
                    <label>Kirjautumisen aika {getHHMMSS(modalTime)}</label>
                  </div>
                </div>
                <button
                  className="modal-button"
                  onClick={() => {
                    setModalText("");
                    setShowModal(false);
                  }}
                >
                  Sulje
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkHourPage;

















// import React, { useState, useEffect } from "react";
// import { getHHMMSS, getHHMM } from "../features/functions";
// import { weekdays } from "../features/arrays";
// import "../styles/WorkHourPage.scss";
// import "../styles/MainPage.scss";

// const WorkHourPage = () => {
//   const [time, setTime] = useState(getHHMMSS());
//   const [arrival, setArrival] = useState(null);
//   const [departure, setDeparture] = useState(null);
//   const [workTimes, setWorkTimes] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalText, setModalText] = useState("");
//   const [modalTime, setModalTime] = useState(new Date());

//   const year = new Date().getFullYear();
//   const month = new Date().getMonth();
//   const date = new Date().getDate();

//   /* Update the clock time every second */
//   useEffect(() => {
//     const interval = setInterval(() => setTime(getHHMMSS()), 1000);
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   /* Save the arrival/departure unix stamp to db by using "yyyy-mm-dd" doc name, save log info to db */
//   const setWorkTime = async () => {
//     // Remove any backend-related code
//   };

//   /* Fetch today stamps and set them in arrival/departure states if exists, fetch all docs from the working-time collection */
//   const fetchWorkTime = async () => {
//     // Remove any backend-related code
//   };

//   /* When arrival/departure changes, call the setWorkTime function */
//   useEffect(() => {
//     if (!arrival && !departure) {
//       return;
//     }
//     setWorkTime();
//   }, [arrival, departure]);

//   /* Arrival allowed between 7:20-9:10 */
//   const arrivalAllowed = () => {
//     return (
//       new Date().valueOf() > new Date(year, month, date, "7", "20").valueOf() &&
//       new Date().valueOf() < new Date(year, month, date, "9", "10").valueOf() &&
//       !arrival
//     );
//   };

//   /* Departure allowed after 8h04min = 29040000, 8h14min = 296400000 */
//   const departureAllowed = () => {
//     return new Date().valueOf() > parseInt(arrival) + 29040000 && new Date().valueOf() < parseInt(arrival) + 29640000 && !departure;
//   };

//   return (
//     <div className="mainpage">
//     <div className="workhour-content">
//       <div className="date-buttons-content">
//         <div className="date-column">
//           <div className="date-label">
//             <label>{new Date().toLocaleDateString("fi-FI", { weekday: "long", year: "numeric", month: "numeric", day: "numeric" })}</label>
//           </div>
//           <div className="time-label">
//             <label>{time}</label>
//           </div>
//         </div>
//         <div className="button-column">
//           {arrivalAllowed() ? (
//             <div
//               className="time-button"
//               onClick={() => {
//                 setModalText("Olet kirjautunut sisään!");
//                 setModalTime(new Date());
//                 setArrival(new Date().valueOf().toString());
//                 setShowModal(true);
//               }}
//             >
//               Sisään
//             </div>
//           ) : (
//             <div className="time-button disabled">Sisään</div>
//           )}
//           {departureAllowed() ? (
//             <div
//               className="time-button"
//               onClick={() => {
//                 setModalText("Olet kirjautunut ulos!");
//                 setModalTime(new Date());
//                 setDeparture(new Date().valueOf().toString());
//                 setShowModal(true);
//               }}
//             >
//               Ulos
//             </div>
//           ) : (
//             <div className="time-button disabled">Ulos</div>
//           )}
//         </div>
//       </div>
//       <div className="right-side-main">
//         <div className="times-content">
//           <div className="previous-content">
//             <div className="previous-label">
//               <p>Aiemmat työaikakirjaukset</p>
//             </div>
//             <div className="previous-data">
//               <div className="data-row title" key="title">
//                 <div className="day-date-label">
//                   <label>PÄIVÄMÄÄRÄ</label>
//                 </div>
//                 <label>SISÄÄN</label>
//                 <label>ULOS</label>
//               </div>
//               {workTimes.slice(-6).map((data, index) => (
//                 <div className={`data-row ${index % 2 === 1 && "odd"}`} key={index}>
//                   <div className="day-date-label">
//                     <label>{weekdays[new Date(parseInt(data.arrival)).getDay()]}</label>
//                     <label>
//                       {new Date(parseInt(data.arrival)).getDate()}.{new Date(parseInt(data.arrival)).getMonth() + 1}
//                     </label>
//                   </div>
//                   <label>{getHHMM(new Date(parseInt(data.arrival)))}</label>
//                   {data.departure ? <label>{getHHMM(new Date(parseInt(data.departure)))}</label> : <label className="empty-label" />}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="working-time-content">
//             <div className="label-stamp-box-content">
//               <label className="title-label">Sisään:</label>
//               <label className="stamp-box-label">{arrival && getHHMMSS(new Date(parseInt(arrival)))}</label>
//             </div>
//             <div className="label-stamp-box-content">
//               <label className="title-label">Ulos:</label>
//               <label className="stamp-box-label">{departure && getHHMMSS(new Date(parseInt(departure)))}</label>
//             </div>
//           </div>
//         </div>
//       </div>
//       {showModal && (
//         <div className="modal transparent-background">
//           <div className="modal">
//             <div className="modal-container">
//               <div className="modal-text-content">
//                 <div className="text-label">
//                   <label>{modalText}</label>
//                 </div>
//                 <div className="description-label">
//                   <label>Kirjautumisen aika {getHHMMSS(modalTime)}</label>
//                 </div>
//               </div>
//               <button
//                 className="modal-button"
//                 onClick={() => {
//                   setModalText("");
//                   setShowModal(false);
//                 }}
//               >
//                 Sulje
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     </div>
//   );
// };

// export default WorkHourPage;

//////////////////////////////////////////////////

//Without aarival adn departure allowed functions

// import React, { useState, useEffect } from "react";
// import { getHHMMSS, getHHMM } from "../features/functions";
// import { weekdays } from "../features/arrays";
// import "../styles/WorkHourPage.scss";
// import "../styles/MainPage.scss";

// const WorkHourPage = () => {
//   const [time, setTime] = useState(getHHMMSS());
//   const [arrival, setArrival] = useState(null);
//   const [departure, setDeparture] = useState(null);
//   const [workTimes, setWorkTimes] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalText, setModalText] = useState("");
//   const [modalTime, setModalTime] = useState(new Date());

//   /* Update the clock time every second */
//   useEffect(() => {
//     const interval = setInterval(() => setTime(getHHMMSS()), 1000);
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   /* Save the arrival/departure unix stamp to db by using "yyyy-mm-dd" doc name, save log info to db */
//   const setWorkTime = async () => {
//     // Remove any backend-related code
//   };

//   /* Fetch today stamps and set them in arrival/departure states if they exist, fetch all docs from the working-time collection */
//   const fetchWorkTime = async () => {
//     // Remove any backend-related code
//   };

//   /* When arrival/departure changes, call the setWorkTime function */
//   useEffect(() => {
//     if (!arrival && !departure) {
//       return;
//     }
//     setWorkTime();
//   }, [arrival, departure]);

//   return (
//     <div className="mainpage">
//       <div className="workhour-content">
//         <div className="date-buttons-content">
//           <div className="date-column">
//             <div className="date-label">
//               <label>{new Date().toLocaleDateString("fi-FI", { weekday: "long", year: "numeric", month: "numeric", day: "numeric" })}</label>
//             </div>
//             <div className="time-label">
//               <label>{time}</label>
//             </div>
//           </div>
//           <div className="button-column">
//             <div
//               className="time-button"
//               onClick={() => {
//                 setModalText("Olet kirjautunut sisään!");
//                 setModalTime(new Date());
//                 setArrival(new Date().valueOf().toString());
//                 setShowModal(true);
//               }}
//             >
//               Sisään
//             </div>
//             <div
//               className="time-button"
//               onClick={() => {
//                 setModalText("Olet kirjautunut ulos!");
//                 setModalTime(new Date());
//                 setDeparture(new Date().valueOf().toString());
//                 setShowModal(true);
//               }}
//             >
//               Ulos
//             </div>
//           </div>
//         </div>
//         <div className="right-side-main">
//           <div className="times-content">
//             <div className="previous-content">
//               <div className="previous-label">
//                 <p>Aiemmat työaikakirjaukset</p>
//               </div>
//               <div className="previous-data">
//                 <div className="data-row title" key="title">
//                   <div className="day-date-label">
//                     <label>PÄIVÄMÄÄRÄ</label>
//                   </div>
//                   <label>SISÄÄN</label>
//                   <label>ULOS</label>
//                 </div>
//                 {workTimes.slice(-6).map((data, index) => (
//                   <div className={`data-row ${index % 2 === 1 && "odd"}`} key={index}>
//                     <div className="day-date-label">
//                       <label>{weekdays[new Date(parseInt(data.arrival)).getDay()]}</label>
//                       <label>
//                         {new Date(parseInt(data.arrival)).getDate()}.{new Date(parseInt(data.arrival)).getMonth() + 1}
//                       </label>
//                     </div>
//                     <label>{getHHMM(new Date(parseInt(data.arrival)))}</label>
//                     {data.departure ? <label>{getHHMM(new Date(parseInt(data.departure)))}</label> : <label className="empty-label" />}
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="working-time-content">
//               <div className="label-stamp-box-content">
//                 <label className="title-label">Sisään:</label>
//                 <label className="stamp-box-label">{arrival && getHHMMSS(new Date(parseInt(arrival)))}</label>
//               </div>
//               <div className="label-stamp-box-content">
//                 <label className="title-label">Ulos:</label>
//                 <label className="stamp-box-label">{departure && getHHMMSS(new Date(parseInt(departure)))}</label>
//               </div>
//             </div>
//           </div>
//         </div>
//         {showModal && (
//           <div className="modal transparent-background">
//             <div className="modal">
//               <div className="modal-container">
//                 <div className="modal-text-content">
//                   <div className="text-label">
//                     <label>{modalText}</label>
//                   </div>
//                   <div className="description-label">
//                     <label>Kirjautumisen aika {getHHMMSS(modalTime)}</label>
//                   </div>
//                 </div>
//                 <button
//                   className="modal-button"
//                   onClick={() => {
//                     setModalText("");
//                     setShowModal(false);
//                   }}
//                 >
//                   Sulje
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WorkHourPage;
