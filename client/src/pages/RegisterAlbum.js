import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export function RegisterAlbum() {
  const [albumName, setAlbumName] = useState("");
  const [albumImg, setAlbumImg] = useState(null);
  const [description, setDescription] = useState("");
  const state = useSelector((state) => state.accountReducer);
  const account = state.account;
  const onChangeAlbumName = (e) => {
    setAlbumName(e.target.value);
  };
  const onChangeAlbumImg = (e) => {
    setAlbumImg(e.target.files[0]);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const saveAlbum = async () => {
    if (albumName && account && albumImg && description) {
      const formData = new FormData();
      formData.append("albumName", albumName);
      formData.append("account", account);
      formData.append("albumImg", albumImg);
      formData.append("description", description);
      await axios
        .post("http://localhost:12367/album/register", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
        });
    } else if (!albumName) {
      alert("이름을 입력해주세요.");
    } else if (!account) {
      alert("지갑을 연결해주세요.");
    } else if (!albumImg) {
      alert("앨범의 대표사진을 선택해주세요.");
    } else if (!description) {
      alert("앨범의 설명을 입력해주세요.");
    }
  };
  return (
    <div id="registeralbumpage">
      <div>
        <div className="pagetitle">앨범 등록</div>
        <div>{state.isConnect ? state.account : "지갑을 연결하세요."}</div>
        <div>
          <input
            className="fileinput"
            type="file"
            onChange={(e) => onChangeAlbumImg(e)}
            name="stonefile"
          />
        </div>
        <div className="registertext">composer</div>
        <input
          className="stonenameinput"
          type="text"
          placeholder="앨범의 이름을 입력해주세요."
          onChange={onChangeAlbumName}
        ></input>
      </div>
      <div>
        <div className="registertext">info</div>
        <textarea
          className="stoneinfoinput"
          type="text"
          placeholder="앨범의 소개글을 입력해주세요."
          onChange={onChangeDescription}
        ></textarea>
      </div>
      <div>
        <button className="editbtn" onClick={saveAlbum}>
          등록
        </button>
      </div>
    </div>
  );
}
