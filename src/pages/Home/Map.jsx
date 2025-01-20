import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Map() {
  const [coordinates, setCoordinates] = useState({ x: null, y: null });
  const [postDetails, setPostDetails] = useState({
    title: "서귀포 검은 물체 귀신맞나요?",
    author: "홍길동",
    date: "2023-10-15",
    keywords: ["호러", "깜놀주의", "귀신"],
    location: "정방폭포",
    views: 1234,
    likes: 56,
    content: `
      정방폭포는 물이 바다로 바로 떨어지는 독특한 폭포로 유명하다. 하지만 마을 어르신들은 이곳에서 물소리 외에 다른 소리가 들린다고 말했다.
      "밤이 되면, 폭포소리 사이로 여자 울음소리가 들려. 가깝게 다가가면 소리는 점점 커지고, 갑자기 멈춰. 그때는 절대 뒤를 돌아보면 안 된다."
      전설에 따르면, 오래전 이곳에서 억울하게 죽은 여인의 영혼이 폭포 아래에서 떠도는 것이라 한다. 한 여행객이 밤중에 정방폭포를 찾았고, 폭포 아래에서 물속을 응시하는 여인을 발견했다. 가까이 다가가자 여인은 "도와줘요..."라고 속삭였다. 놀란 여행객이 뒤를 돌아보자, 아무도 없는 물 위에 긴 머리의 여인이 서 있었다고 한다. 그 후 그 여행객은 이상한 악몽에 시달리며 한 달 만에 사라졌다.
    `,
  });

  const address = "제주특별자치도 서귀포시 정방폭포로 216-1";

  useEffect(() => {
    const getCoordinates = async (address) => {
      const apiKey = "c336c5f9693c39fe9574cd576650432e";
      const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
        address
      )}`;
      const headers = {
        Authorization: `KakaoAK ${apiKey}`,
        KA: "os=web; origin=http://54.87.193.13:8501",
      };

      try {
        const response = await fetch(url, { headers });
        const result = await response.json();

        if (result.documents && result.documents.length > 0) {
          const { x, y } = result.documents[0].address;
          setCoordinates({ x, y });
        } else {
          console.error("주소를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    getCoordinates(address);
  }, [address]);

  useEffect(() => {
    if (coordinates.x && coordinates.y) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=278d30c7d8ea9268166cee76781db0ba&autoload=false`;
      script.async = true;

      script.onload = () => {
        const { kakao } = window;
        kakao.maps.load(() => {
          const lat = parseFloat(coordinates.y);
          const lon = parseFloat(coordinates.x);

          const container = document.getElementById("map");
          const options = {
            center: new kakao.maps.LatLng(lat, lon),
            level: 2,
          };

          const map = new kakao.maps.Map(container, options);

          const markerPosition = new kakao.maps.LatLng(lat, lon);
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);

          const iwContent = `<div style="text-align:center;padding:2px;width:210px;">${postDetails.title}</div>`;
          const infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
          });
          infowindow.open(map, marker);

          kakao.maps.event.addListener(marker, "click", () => {
            window.open(
              `https://map.kakao.com/link/map/${postDetails.title},${lat},${lon}`
            );
          });
        });
      };

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [coordinates, postDetails.title]);

  return (
    <Container>
      <Title>{postDetails.title}</Title>
      <SubTitle>작성자: {postDetails.author}</SubTitle>
      <InfoSection>
        <InfoColumn>
          <p>작성 날짜: {postDetails.date}</p>
          <p>키워드: {postDetails.keywords.join(", ")}</p>
          <p>장소: {postDetails.location}</p>
        </InfoColumn>
        <InfoColumn>
          <p>조회수: {postDetails.views}</p>
          <p>좋아요 수: {postDetails.likes}</p>
        </InfoColumn>
      </InfoSection>
      <hr />
      <Content>{postDetails.content}</Content>
      <MapContainer id="map"></MapContainer>
      {!coordinates.x && !coordinates.y && <p>주소를 찾을 수 없습니다.</p>}
    </Container>
  );
}

export default Map;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

const InfoColumn = styled.div`
  flex: 1;
  padding: 0 10px;
`;

const Content = styled.p`
  line-height: 1.6;
  margin-bottom: 1em;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 350px;
  margin-top: 1em;
`;
