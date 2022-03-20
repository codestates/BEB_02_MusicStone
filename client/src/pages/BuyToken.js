import { useSelector } from "react-redux";
import Caver from "caver-js";
import React, { useState } from "react";

export function BuyToken() {
  const state = useSelector((state) => state.accountReducer);
  const account = state.account;
  const [balance, setBalance] = useState(0);
  // caver-js 연결
  const caver = new Caver(window.klaytn);

  const checkAccount = () => {
    alert(account);
  };
  const CheckUnlocked = async () => {
    // 지갑이 연결되어있다면 true, 아니라면 false를 리턴합니다.
    return await window.klaytn._kaikas.isUnlocked();
  };
  const checkBalance = async () => {
    if (state.isConnect) {
      console.log("account : " + account);
      // caver 함수 중 현재 공개키의 klay양을 리턴하는 함수
      let bal = await caver.klay.getBalance(account);
      bal = caver.utils.fromPeb(bal, "KLAY");
      setBalance(bal);
      console.log("balance : " + bal);
    } else {
      alert("지갑 연결이 필요합니다.");
    }
  };
  return (
    <div id="buytokenpage">
      <div className="pagetitle">토큰 구매</div>
      <div>
        <span className="text">구매할 계정이 맞는지 확인하세요.</span>
        <button onClick={checkAccount}>계정 확인</button>
      </div>
      <div>
        <span className="text">잔액 : {balance} klay</span>
        <button onClick={checkBalance}>잔액 확인</button>
      </div>
      <input
        className="tokeninput"
        placeholder="교환할 토큰 수를 적어주세요."
      ></input>
      <button className="tokenbtn">교환</button>
    </div>
  );
}
