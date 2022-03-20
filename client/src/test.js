/* pakage.json에 아래 버전확인 및 추가
"dependencies": {
    "caver-js": "^1.6.4",
    "caver-js-ext-kas": "^1.4.0",
    "dotenv": "^10.0.0",
*/

require("dotenv").config();

//.env에 아래 주소 및 키 저장
// var tokenAddress = process.env.tokenAddress; //"0x39a9E02d6020e333EC1Fb52E07a1A26Ca74729c2"
// var walletAddress = process.env.walletAddress; //"0xD48911AAC5853a6cfDe55514dF6DF6C5E0b41DaB"
// var walletPrivateKey = process.env.walletPrivateKey; //"0x3d9949d0a7a2991d956fa00b8f66eafa847b7f81e1e510f01ae9f29ebaf11299"
// var accessKeyId = process.env.accessKeyId; // KASKXUVG685M6CK21T4FZKIX KAS 콘솔 - Security - Credential에서 발급받은 accessKeyId 인증아이디
// var secretAccessKey = process.env.secretAccessKey; // 66smLjtQSmjsPhy-shsWBM2TMIgmXUlACR0sSn5m  KAS 콘솔 - Security - Credential에서 발급받은 secretAccessKey 인증비밀번호

var tokenAddress = "0x39a9E02d6020e333EC1Fb52E07a1A26Ca74729c2";
var walletPrivateKey =
  "0x3d9949d0a7a2991d956fa00b8f66eafa847b7f81e1e510f01ae9f29ebaf11299";
var accessKeyId = "KASKXUVG685M6CK21T4FZKIX"; //KAS 콘솔 - Security - Credential에서 발급받은 accessKeyId 인증아이디
var secretAccessKey = "66smLjtQSmjsPhy-shsWBM2TMIgmXUlACR0sSn5m"; //KAS 콘솔 - Security - Credential에서 발급받은 secretAccessKey 인증비밀번호

// connection.connect();
const CaverExtKAS = require("caver-js-ext-kas");
const caver = new CaverExtKAS();

const chainId = 1001; // 클레이튼 테스트 네트워크 접속 ID

caver.initKASAPI(chainId, accessKeyId, secretAccessKey); //KAS console 초기화

// 서버계정 프라이빗키
const keyringContainer = new caver.keyringContainer();
const keyring = keyringContainer.keyring.createFromPrivateKey(walletPrivateKey);
keyringContainer.add(keyring);

async function tokenTransaction(toAddress, amount) {
  //token 송금 function
  const kip7 = new caver.kct.kip7(tokenAddress); //생성된 토큰의 Address 입력
  kip7.setWallet(keyringContainer); //kip7 내의 wallet 설정
  //transfer('토큰 받는 주소', 토큰 양, {from:'트랜젝션을 일으키는 주소'})
  const receipt = await kip7.transfer(toAddress, amount, {
    from: keyring.address,
  });
  console.log(`[Token Transaction]\n` + receipt);
}
tokenTransaction(
  "0xfA2e5d0454520D35516d0ACF9ecA711C00Be7c26",
  caver.utils.toPeb(777, "KLAY")
).then((sendResult) => {
  console.log(sendResult);
  console.log(
    `${"0xfa2e5d0454520d35516d0acf9eca711c00be7c26"} 에게 토큰 ${5}개를 보냈습니다.`
  );
});

async function balanceOf(_address) {
  const kip7 = new caver.kct.kip7(tokenAddress); //생성된 토큰의 Address 입력
  kip7.setWallet(keyringContainer); //kip7 내의 wallet 설정
  const receipt = await kip7.balanceOf(_address); //balanceOf('토큰 조회할 주소')
  console.log(receipt);
  return receipt;
}
balanceOf("0xD48911AAC5853a6cfDe55514dF6DF6C5E0b41DaB").then((tokenData) => {
  console.log("server:" + caver.utils.fromPeb(tokenData, "KLAY"));
});

balanceOf("0xfA2e5d0454520D35516d0ACF9ecA711C00Be7c26").then((tokenData) => {
  console.log("jason : " + caver.utils.fromPeb(tokenData, "KLAY"));
});

/*
//스마트컨트랙 생성
const smartcontract = new cav.klay.Contract( // BusSafe 수정
  BusSafe.abi,
  BusSafe.networks[1001].address
); //1001(Baobob-Testnet), 8217(Cypress-Mainnet)

//스마트컨트랙 송금(???)
smartcontract.methods
  .send({
    from: "0xD48911AAC5853a6cfDe55514dF6DF6C5E0b41DaB",
    gas: 8500000,
  })
  .then((result) => {
    console.log(result);
    token_trans(user.address, "10");
  })
  .then((receipt) => {
    console.log(receipt);
  });
  */
