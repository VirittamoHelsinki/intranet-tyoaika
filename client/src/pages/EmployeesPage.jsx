import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fullName } from "../features/functions";
import "../styles/EmployeesPage.scss";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);

  // You no longer need Firebase-related functions.

  // Use a sample data array instead of fetching from Firebase.
  const sampleData = [
    { uid: "1", email: "employee1@example.com" },
    { uid: "2", email: "employee2@example.com" },
    // Add more sample data if needed.
  ];

  // Simulate fetching employees (replace this with your actual data retrieval logic)
  const fetchEmployees = async () => {
    // Simulate fetching data (replace this with your actual Firebase data fetching)
    setEmployees(sampleData);
  };

  useEffect(() => {
    // Call the fetchEmployees function when the page loads (remove this if not needed)
    fetchEmployees();
  }, []);

  return (
    <div className="employees-content">
      <div className="employees-title">
        <label>Työntekijät</label>
      </div>
      <div className="employees-list">
        {employees.map((data, index) => (
          <div className={`employee-data ${index % 2 === 0 && "even"}`} key={index}>
            <label>{fullName(data.email)}</label>
            <Link to="/work-schedule" className="schedule-button" state={{ uid: data.uid, name: fullName(data.email) }}>
              Työajat
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesPage;
