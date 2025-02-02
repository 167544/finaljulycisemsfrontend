import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Bar from "./scenes/bar";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import store from "./store";
import { Provider, useSelector } from "react-redux";
import Talentpool from "./scenes/talentpool";
import CustomerDetails from "./components/CustomerDetails";
import FinanceExternal from "./components/FinanceExternal";
// import FooterBar from "../src/scenes/global/Footer"; // Import the FooterBar component

function MainDashboard(props) {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const data = useSelector((state) => state);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content" style={{ backgroundColor: "#102E4A" }}>
            <Topbar setIsSidebar={setIsSidebar} handleUserLogout={props.handleUserLogout} />

            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/dashboard/contacts" element={<Contacts />} />
              <Route path="/dashboard/talentpool" element={<Talentpool />} />
              <Route path="/dashboard/customers" element={<CustomerDetails />} />
              <Route path="/dashboard/finance" element={<FinanceExternal />} />

              <Route path="/dashboard/invoices" element={<Invoices />} />
              <Route path="/dashboard/form" element={<Form />} />
              <Route path="/dashboard/bar" element={<Bar />} />
              <Route path="/dashboard/pie" element={<Pie />} />
              <Route path="/dashboard/line" element={<Line />} />
              <Route path="/dashboard/faq" element={<FAQ />} />
              <Route path="/dashboard/calendar" element={<Calendar />} />
              <Route path="/dashboard/geography" element={<Geography />} />
            </Routes>

            {/* <FooterBar /> Include the FooterBar component here */}
          </main>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default MainDashboard;
