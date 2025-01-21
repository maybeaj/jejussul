import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

function Detail() {
  const { id } = useParams();
  console.log("Fetched ID:", id);
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`http://44.192.73.111:5000/get_story/${id}`);
        const [storyId, author, location, story, title, likes, views] = response.data;
        setPostDetails({ id: storyId, author, location, story, title, likes, views });
      } catch (error) {
        console.error("Error fetching story details:", error);
      }
    };

    fetchStory();
  }, [id]);

  if (!postDetails) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Title>{postDetails.title}</Title>
      <SubTitle>작성자: {postDetails.author}</SubTitle>
      <InfoSection>
        <p>장소: {postDetails.location}</p>
        <p>좋아요: {postDetails.likes}</p>
        <p>조회수: {postDetails.views}</p>
      </InfoSection>
      <hr />
      <Content>{postDetails.story}</Content>
    </Container>
  );
}

export default Detail;

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
  font-size: 1.3em;
  margin-bottom: 1em;
  text-align: center;
  color: #333;
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
