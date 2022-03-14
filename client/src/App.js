import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Musician from "./pages/Musician";
import Stones from "./pages/Stones";
import Mypage from "./pages/Mypage";
import Playlist from "./pages/Playlist";
import Nav from "./components/Nav";
import "./App.css";
import React, { useEffect, useState } from "react";
import Web3 from "web3";

function App() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState("");

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    console.log(accounts[0]);
    alert(accounts[0]);
  };
  return (
    <div>
      <Router>
        <Nav connectWallet={connectWallet} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/musician" element={<Musician />} />
          <Route path="/stones" element={<Stones />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/playlist" element={<Playlist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
