import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
	const navigate = useNavigate();
	const [rankings, setRankings] = useState([
		{
			rank: 1,
			title: "프레스터 경의 비밀 ...",
			author: "성하",
			genre: "로판",
			views: 3444,
			image: "url-to-image-1",
		},
		{
			rank: 2,
			title: "뺏긴 자리에 미련 없...",
			author: "최아리",
			genre: "로판",
			views: 2436,
			image: "url-to-image-2",
		},
		{
			rank: 3,
			title: "낮 유어 프렌드",
			author: "리봄",
			genre: "로맨스",
			views: 2472,
			image: "url-to-image-3",
		},
		{
			rank: 4,
			title: "계약이 끝나는 날",
			author: "구르미르",
			genre: "로맨스",
			views: 2507,
			image: "url-to-image-4",
		},
		{
			rank: 5,
			title: "남편의 채운",
			author: "초아",
			genre: "로맨스",
			views: 1900,
			image: "url-to-image-5",
		},
	]);

	useEffect(() => {
		// 백엔드에서 데이터를 가져오는 부분은 주석 처리하거나 나중에 추가
		// axios.get('/api/rankings')
		// 	.then(response => {
		// 		setRankings(response.data);
		// 	})
		// 	.catch(error => {
		// 		console.error("Error fetching rankings:", error);
		// 	});
	}, []);

	return (
		<Container>
			<Header>
				<Title>제주썰</Title>
				<WriteButton onClick={() => navigate('/write')}>글쓰기</WriteButton>
			</Header>
			{rankings.map((item) => (
				<RankingItem key={item.rank} onClick={() => navigate('/detail')}>
					<RankNumber>{item.rank}</RankNumber>
					<Image src={item.image} />
					<Info>
						<SSulTitle>{item.title}</SSulTitle>
						<Details>
							{item.author} · {item.genre} · 조회수 {item.views}
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
