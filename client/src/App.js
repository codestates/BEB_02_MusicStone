import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Musician from "./pages/Musician";
import Stones from "./pages/Stones";
import Mypage from "./pages/Mypage";
import Playlist from "./pages/Playlist";
import RegisterMusician from "./pages/RegisterMusician";
import Nav from "./components/Nav";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [account, setAccount] = useState("");
  const state = useSelector((state) => state.accountReducer);
  const kaikasLogin = async () => {
    try {
      const wallet = await window.klaytn.enable();
      setAccount(wallet);
      dispatch({ type: "ON_CONNECT", account: wallet });
      alert(wallet);
    } catch (ex) {
      console.log(ex);
    }
  };
  const connectWallet = () => {
    if (typeof window.klaytn !== "undefined") {
      const provider = window["klaytn"];
      console.log("connectwallet 실행");
      kaikasLogin();
    } else {
      console.log("connectwallet else");
    }
  };
  return (
    <div>
      <Router>
        <Nav connectWallet={connectWallet} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/musician" element={<Musician />} />
          <Route path="/musician/register" element={<RegisterMusician />} />
          <Route path="/stones" element={<Stones />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/playlist" element={<Playlist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
