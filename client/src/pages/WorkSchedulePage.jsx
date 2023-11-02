import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getHHMM, getDate } from "../features/functions";
import { weekdays, months } from "../features/arrays";
import "../styles/WorkSchedulePage.scss";

const WorkSchedulePage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  /* Fetch the work schedule data by setting the day of the selected month to 1 and use a while loop until the month changes */
  const fetchMonthData = async () => {
    try {
      setLoading(true);
      let _days = [];
      let date = new Date(currentYear, currentMonth, 1);
      while (date.getMonth() === currentMonth) {
        let arrival = null;
        let departure = null;
        // Replace the backend-related code with your data fetching logic here
        // Example:
        // const scheduleData = await fetchDataForDate(date); // Fetch data for the current date
        // if (scheduleData) {
        //   arrival = scheduleData.arrival;
        //   departure = scheduleData.departure;
        // }
        
        /* Push the date object with stamp data to the list and set the date 1 up */
        _days.push({
          day: date.getDay(),
          date: date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
          arrival: arrival,
          departure: departure,
        });
        date.setDate(date.getDate() + 1);
      }
      setDays(_days);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      window.alert("Ongelmia käyttäjätiedon haussa:\n\n" + error);
    }
  };

  /* Do the fetching when the month changes */
  useEffect(() => {
    fetchMonthData();
  }, [currentMonth]);

  /* Decrease month number */
  const prevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth(currentMonth - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    }
  };

  /* Increase month number */
  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth(currentMonth + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    }
  };

  /* Return in/out stamp if stamp exists, return empty if weekend or date is bigger than yesterday date, return "missing stamp" in all other cases  */
  const timeTag = (date, stamp) => {
    if (stamp) {
      return <label className="time-label"> {getHHMM(new Date(parseInt(stamp)))}</label>;
    }
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.day === 0 || date.day === 6 || new Date(date.year, date.month, date.date) > yesterday) {
      return;
    }
    return <label className="time-label">Leimaus puuttuu</label>;
  };

  return (
    <div className="schedule-main">
      <div className="schedule-content">
        <div className="employee-name-month-buttons">
          <div className="employee-name-title">
            <label>{location.state.name}</label>
          </div>
          <div className="month-buttons-row">
            <label className="arrow-button" onClick={prevMonth}>
              &lt;
            </label>
            <label className="month-label">{months[currentMonth]}</label>
            <label className="arrow-button" onClick={nextMonth}>
              &gt;
            </label>
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="schedule-list">
            <div className="schedule-data title" key={"title"}>
              <div className="date-content">
                <label className="weekday-label">PÄIVÄMÄÄRÄ</label>
              </div>
              <label className="time-label">SISÄÄN</label>
              <label className="time-label">ULOS</label>
            </div>
            {days.map((day, index) => (
              <div className={`schedule-data ${index % 2 === 0 && "even"}`} key={index}>
                <div className="date-content">
                  <label className="weekday-label">{weekdays[day.day]}</label>
                  <label>
                    {day.date}.{parseInt(day.month) + 1 < 10 ? "0" + (parseInt(day.month) + 1) : parseInt(day.month) + 1}.{day.year}
                  </label>
                </div>
                {timeTag(day, day.arrival)}
                {timeTag(day, day.departure)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkSchedulePage;
