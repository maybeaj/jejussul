import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

// 전체 배경 스타일
const Background = styled.div`
  position: fixed; // 고정 위치
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("/jeju.jpg"); // 배경 이미지 설정
  background-size: cover; // 배경 이미지 크기 조정
  background-position: center; // 배경 이미지 위치 조정
  filter: blur(2px); // 흐림 효과 추가
  z-index: -1; // 다른 요소들 아래에 위치
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  position: relative; // 자식 요소를 위한 상대 위치 설정
  background-color: rgba(255, 255, 255, 0.8); // 배경을 약간 흰색으로 덮어줌
  border-radius: 8px; // 모서리 둥글게
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

function Detail() {
  const { id } = useParams();
  console.log("Fetched ID:", id);
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(
          `http://44.200.180.53:5000/get_story/${id}`
        );
        console.log("Fetched story details:", response.data);

        // 배열을 객체로 변환
        const [
          storyId,
          author,
          location,
          story,
          title,
          likes,
          views,
          imageUrl,
        ] = response.data;
        setPostDetails({
          id: storyId,
          author,
          location,
          story,
          title,
          likes,
          views,
          imageUrl,
        });
      } catch (error) {
        console.error("Error fetching story details:", error);
      }
    };

    fetchStory();
  }, [id]);

  useEffect(() => {
    let script; // script 변수를 useEffect 범위 내에서 정의

    if (postDetails) {
      console.log("Post Details:", postDetails); // postDetails 확인

      script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=278d30c7d8ea9268166cee76781db0ba&autoload=false"; // 실제 API 키 사용
      script.async = true;

      script.onload = () => {
        const { kakao } = window;
        console.log("Kakao Maps script loaded"); // 스크립트 로드 확인
        kakao.maps.load(() => {
          console.log("Kakao Maps loaded"); // 카카오 맵 로드 확인

          // 주소로 좌표 변환
          const geocoder = new kakao.maps.services.Geocoder();
          geocoder.addressSearch(postDetails.location, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              const container = document.getElementById("map");

              // DOM 요소 확인
              if (!container) {
                console.error("Map container not found!");
                return; // 요소가 없으면 함수 종료
              }

              const options = {
                center: coords, // 변환된 좌표를 사용
                level: 2,
              };

              const map = new kakao.maps.Map(container, options);

              const marker = new kakao.maps.Marker({
                position: coords,
              });
              marker.setMap(map);

              const iwContent = `<div style="text-align:center;padding:2px;width:210px;">${postDetails.location}</div>`; // 마커에 표시할 내용
              const infowindow = new kakao.maps.InfoWindow({
                content: iwContent,
              });
              infowindow.open(map, marker);

              kakao.maps.event.addListener(marker, "click", () => {
                window.open(
                  `https://map.kakao.com/link/map/${
                    postDetails.location
                  },${coords.getLat()},${coords.getLng()}`
                );
              });
            } else {
              console.error("주소 변환 실패:", status);
            }
          });
        });
      };

      document.head.appendChild(script);
    }

    return () => {
      if (script) {
        document.head.removeChild(script); // script 변수가 정의되어 있을 때만 제거
      }
    };
  }, [postDetails]);

  if (!postDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Background /> {/* 배경 이미지 추가 */}
      <Container>
        <ContentWrapper>
          <Title>{postDetails.title}</Title>
          <SubTitle>작성자: {postDetails.author}</SubTitle>
          <InfoSection>
            <p>장소: {postDetails.location}</p>
            <p>좋아요: {postDetails.likes}</p>
            <p>조회수: {postDetails.views}</p>
          </InfoSection>
          <hr />
          <Content>{postDetails.story}</Content>

          {/* 지도 이미지 추가 */}
          <ImageContainer>
            <img
              src="/map.png"
              alt="Map"
              style={{ width: "100%", height: "auto" }}
            />
          </ImageContainer>

          {/* 댓글 기능 추가 */}
          <CommentsSection>
            <h3>댓글</h3>
            {dummyComments.map((comment, index) => (
              <Comment key={index}>
                <strong>{comment.author}:</strong> {comment.text}
              </Comment>
            ))}
          </CommentsSection>
        </ContentWrapper>
      </Container>
    </>
  );
}

// 더미 댓글 데이터
const dummyComments = [
  { author: "사용자1", text: "이 이야기가 정말 흥미로워요!" },
  { author: "사용자2", text: "좋은 장소네요!" },
  { author: "사용자3", text: "감사합니다!" },
];

// 댓글 섹션 스타일
const CommentsSection = styled.div`
  margin-top: 20px;
`;

const Comment = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f1f1f1;
`;

const ContentWrapper = styled.div`
  position: relative; // 자식 요소를 위한 상대 위치 설정
  z-index: 1; // 배경 이미지 위에 표시되도록 설정
  background-color: rgba(255, 255, 255, 0.8); // 배경을 약간 흰색으로 덮어줌
  border-radius: 8px; // 모서리 둥글게
  padding: 20px; // 패딩 추가
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 0.5em;
  text-align: center;
`;

const SubTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 1em;
  text-align: center;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
`;

const Content = styled.p`
  line-height: 1.6;
  margin-bottom: 1em;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px; // 원하는 높이로 조정
`;

const ImageContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

// Detail 컴포넌트를 기본 내보내기로 설정
export default Detail;
