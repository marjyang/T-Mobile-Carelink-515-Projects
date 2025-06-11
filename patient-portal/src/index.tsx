import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Overview } from "./screens/Overview";
import { RehabRecords } from "./screens/Overview/RehabRecords";
import { Profile } from "./screens/Overview/Profile";
import Exercise from "./screens/Overview/Exercise";
import { Rehabing } from "./screens/Overview/Rehabing";
import { Exercise2 } from "./screens/Overview/Exercise2";
import { Exercise3 } from "./screens/Overview/Exercise3";
import SignInPage from '../SignInPage.jsx';

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/records" element={<RehabRecords />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/exercise1" element={<Rehabing />} />
        <Route path="/exercise2" element={<Exercise2 />} />
        <Route path="/exercise3" element={<Exercise3 />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
