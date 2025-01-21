import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    axios
      .get("http://44.200.180.53:5000/get_stories")
      .then((response) => {
        const parsedData = response.data.map((item, index) => ({
          id: item[0],
          author: item[1],
          location: item[2],
          story: item[3],
          title: item[4],
          rank: index + 1,
          likes: item[5],
          views: item[6],
          image_url: item[7],
        }));
        console.log(response.data);
        setRankings(parsedData);
      })
      .catch((error) => {
        console.error("Error fetching rankings:", error);
      });
  }, []);

  return (
    <Container>
      <Header>
        <Title>제주썰</Title>
        <WriteButton onClick={() => navigate("/write")}>글쓰기</WriteButton>
      </Header>
      {rankings.map((item) => (
        <RankingItem
          key={item.id}
          onClick={() => navigate(`/detail/${item.id}`)}
        >
          <RankNumber>{item.id}</RankNumber>
          <Image src={item.image_url} />
          <Info>
            <SSulTitle>{item.title}</SSulTitle>
            <Details>
              {item.author} · 따봉수 {item.likes} · 조회수 {item.views}
            </Details>
          </Info>
        </RankingItem>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
  margin-top: 100px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const WriteButton = styled.button`
  background-color: #006400;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const RankingItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
`;

const RankNumber = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: green;
  margin-right: 10px;
`;

const Image = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  margin-right: 10px;
`;

const Info = styled.div`
  flex: 1;
`;

const SSulTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Details = styled.div`
  font-size: 14px;
  color: #555;
`;

export default Home;
