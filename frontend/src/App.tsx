<<<<<<< HEAD
import React from "react";
import "./App.css";

function App() {
  return <div>Hi! See 'index.tsx' for changes.</div>;

=======
import React, { useState } from "react";
// import { Router, Route, Link } from "-dom";
import SearchPage from "./ui/searchPage/SearchPage";
// import UserContextProvider from "./UserContextProvider";
// import { observer } from "mobx-react";
import "./App.css";

function App() {
  return (
    <div>
      <SearchPage />
    </div>
  );
>>>>>>> 29986f12a4570f6e2909ece56c9e34c3b742b32d
}

export default App;
