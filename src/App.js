import Router from "./Router";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Home/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/detail" element={<Detail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
