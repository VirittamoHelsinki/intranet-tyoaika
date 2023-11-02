import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
//import MainPage from "./pages/MainPage";

//import WorkSchedulePage from "./pages/WorkSchedulePage";
import WorkHourPage from "./pages/WorkHourPage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<WorkHourPage />} />
    
      </Routes>
    </BrowserRouter>
  );
};

export default App;
