import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react"
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from 'styled-components';
import AlbumStone from '../components/AlbumStone';
import PreviewStream from '../components/PreviewStream';

export const Album = () => {
    const { id } = useParams();
    const server = process.env.REACT_APP_SERVER_ADDRESS || "http://127.0.0.1:12367";
    const account = useSelector(state => state.accountReducer)

    const [isLike, setIsLike] = useState(false);
    const [selectNum, setSelectNum] = useState(0);
    const [albumData, setAlbumData] = useState(initialState);
    const stoneList = albumData.stoneList.map((stone) => Object.assign(stone, { image: `${albumData.albumInfo.image}` }));


    const handleLikeBtn = (type, likeId, isLike) => {
        const req = `${server}/album/${id}`;
        if (account.isConnect) {
            axios.post((req), {
                type,
                userId: account.userId,
                likeId,
                isLike
            })
                .then(() => {
                    if (type === "album") {
                        setIsLike(isLike)
                    } else {
                        loadData();
                    }
                })
        } else {
            alert("지갑을 연결해주세요.");
        }
    }
    const handleStoneClick = (idx) => {
        //현재 db가 계속 바뀌어서 고정값 보냄
        setSelectNum(idx);
    }

    const showMusicinName = () => {
        const korName = albumData.musicianInfo.name_korea;
        const engName = albumData.musicianInfo.name_english;

        if (korName && engName) {
            return `${korName} (${engName})`;
        } else if (korName) {
            return korName;
        } else {
            return engName;
        }

    }

    const showlike = () => {
        return (isLike
            ? <div>
                <FavoriteIcon /><span>좋아요  {albumData.albumInfo.like.length}</span>
            </div>

            : <div>
                <FavoriteBorderIcon /><span>좋아요 {albumData.albumInfo.like.length}</span>
            </div>)
    }
    const showReleaseDate = () => {
        const tempSplit = albumData.albumInfo.release_date.split('-');
        return `${tempSplit[0]}년 ${tempSplit[1]}월 ${tempSplit[2].substr(0, 2)}일`
    }
    const showStones = () => {
        return (stoneList.map((stone, idx) => {
            return <AlbumStone key={idx} stone={stone} selectNum={selectNum} idx={idx} handleStoneClick={handleStoneClick} handleLikeBtn={handleLikeBtn} isConnect={account.isConnect} liked={albumData.stonesIsLikeList[idx]} />
        }))
    }
    const loadData = async () => {
        const req = `${server}/album/${id}?userId=${account.userId}`;
        await axios.get(req)
            .then((res) => { setAlbumData(res.data) })
    }

    useEffect(loadData, [account, isLike])

    useEffect(() => {
        setIsLike(albumData.isLike);
    }, [albumData])

    return (
        albumData.albumInfo
            ? (
                <Body>
                    <AlbumContainer>
                        <ImgWrapper>
                            <Img src={albumData.albumInfo.image} alt={albumData.albumInfo.name} />
                        </ImgWrapper>
                        <InfoWrapper>
                            <Title>{albumData.albumInfo.name}</Title>
                            <InfoBox>
                                <Info>
                                    <Like onClick={() => handleLikeBtn("album", id, !isLike)}>
                                        {showlike()}
                                    </Like>
                                    <Musician>뮤지션 : {albumData.musicianInfo ? showMusicinName() : null}</Musician>
                                    <ReleaseDate>발매일 : {showReleaseDate()}</ReleaseDate>
                                    <Desc>소개 : {albumData.albumInfo.description}</Desc>
                                </Info>
                                <StoneList>
                                    {showStones()}
                                </StoneList>
                            </InfoBox>
                        </InfoWrapper>
                    </AlbumContainer>
                    {stoneList.length !== 0
                        ?
                        <StoneContainer>

                            <PreviewStream stone={stoneList[selectNum]} />
                            <StoneWrapper>
                                <StoneTitle>
                                    <h2>{stoneList[selectNum].name}</h2>
                                </StoneTitle>
                                <StoneInfo>
                                    <div>작사 : Dummy</div>
                                    <div>작곡 : Dummy</div>
                                    <div>장르 : {stoneList[selectNum].category}</div>
                                    <div>가사 : Dummy </div>

                                </StoneInfo>
                            </StoneWrapper>
                        </StoneContainer>

                        : <StoneContainer>
                            <Notice>
                                등록된 스톤이 없습니다.
                            </Notice>
                        </StoneContainer>
                    }
                </Body >)
            : null
    )
}
//초기 state
const initialState = {
    "albumInfo": undefined,
    "musicianInfo": undefined,
    "stoneList": [],
    "stonesIsLikeList": [],
    "isLike": false
};

//여기부터 styled
const Body = styled.div`
box-sizing: border-box;
height: 100%;
font-family: Impact, Charcoal, sans-serif;
`;

const AlbumContainer = styled.article`
width : 1100px;
height : 400px;
display: flex;
align-items: center;
margin: 0 auto;
border-bottom: 2px solid #303030;
`;

const StoneContainer = styled.div`
width : 1100px;
height: 400px;
margin: 0 auto;
display flex;
align-items: center;
`;

const ImgWrapper = styled.div`
width: 300px;
height: 300px; 
margin: 50px;
overflow: hidden;
`;

const InfoWrapper = styled.div`
width : 750px;
height: 350px;
margin: 25px;
display: flex;
flex-direction: column;
overflow: scroll;
`;

const Img = styled.img`
width: 100%;
height: 100%;
object-fit: contain;
-webkit-user-drag: none;
`;

const Title = styled.h1`
font-size: 2.5rem;
margin: 0 auto;
`;
const InfoBox = styled.div`
width: 100%;
height: 100%;
display: flex;
overflow: hidden;
`;

const Info = styled.div`
max-width: 250px;
width: 100%;
height: 100%;
margin: 30px 0 0;
font-weight: 500;
`;

const Like = styled.div`
font-weight: bolder;
color: #9c74ad;
cursor: pointer;
user-select: none;
div{
    display: flex;
}
span{
    margin: 0 5px;
}
`;

const Musician = styled.div`
margin : 10px 0 0;
`;

const ReleaseDate = styled.div`
`;
const Desc = styled.div`
`;

const StoneList = styled.li`
width: 100%;
height: 100%;
margin: 10px;
list-style:none;
overflow: scroll;
li {
    margin: 5px 0;
}
`;
const StoneWrapper = styled.div`
width: 100%;
display:flex;
flex-direction: column;
`;

const StoneTitle = styled.div`
width: 100%;
height: 40px;
margin: 0 auto;
h2{
    font-size: 1.5rem;
    text-align: center;
}
`;

const StoneInfo = styled.div`
width: 100%;
height: 100%;
margin: 20px 50px;
overflow: scroll;

`;

const Notice = styled.div`
width: 100%;
text-align: center;
font-size: 18px;
`;