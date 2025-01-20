import React, { useState } from "react";
import styled from "styled-components";

const Write = () => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [locations, setLocations] = useState("");
	const [prompt, setPrompt] = useState("");
	const [story, setStory] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setStory("");

		try {
			const response = await fetch("http://your-backend-url", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title,
					author,
					locations: locations.split(",").map((loc) => loc.trim()),
					prompt,
				}),
			});

			const data = await response.json();

			if (data.story) {
				setStory(data.story);
			} else {
				setError("이야기를 생성하는 데 실패했습니다.");
			}
		} catch (error) {
			console.error("Error generating story:", error);
			setError("서버와의 통신 중 오류가 발생했습니다.");
		}
	};

	return (
		<Container>
			<Title>제주도 이야기 생성 서비스</Title>
			<Subtitle>관광명소 키워드로 AI가 생성한 이야기를 작성해보세요!</Subtitle>
			<Form onSubmit={handleSubmit}>
				<Label>글 제목</Label>
				<Input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="제목을 입력하세요"
					required
				/>
				<Label>작성자</Label>
				<Input
					type="text"
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
					placeholder="작성자 이름을 입력하세요"
					required
				/>
				<Label>관광명소 키워드</Label>
				<Input
					type="text"
					value={locations}
					onChange={(e) => setLocations(e.target.value)}
					placeholder="관광명소 키워드 (쉼표로 구분)"
					required
				/>
				<Label>AI 요청 프롬프트</Label>
				<Textarea
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					placeholder="AI에게 요청할 이야기를 간략히 설명하세요"
					rows={5}
					required
				></Textarea>
				<Button type="submit">글 생성</Button>
			</Form>
			{story && (
				<StoryContainer>
					<h3>AI가 생성한 이야기:</h3>
					<p>{story}</p>
				</StoryContainer>
			)}
			{error && <ErrorMessage>{error}</ErrorMessage>}
		</Container>
	);
};

const Container = styled.div`
	width: 600px;
	margin: 50px auto;
	padding: 20px;
	background-color: #f9f9f9;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	font-family: Arial, sans-serif;
	color: #333;
`;

const Title = styled.h1`
	font-size: 24px;
	text-align: center;
	margin-bottom: 20px;
`;

const Subtitle = styled.h2`
	font-size: 18px;
	text-align: center;
	margin-bottom: 20px;
	color: #555;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label`
	margin-bottom: 5px;
	font-size: 14px;
	color: #333;
`;

const Input = styled.input`
	margin-bottom: 15px;
	padding: 10px;
	font-size: 16px;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-family: Arial, sans-serif;
`;

const Textarea = styled.textarea`
	margin-bottom: 15px;
	padding: 10px;
	font-size: 16px;
	border: 1px solid #ccc;
	border-radius: 5px;
	resize: none;
	font-family: Arial, sans-serif;
`;

const Button = styled.button`
	padding: 10px;
	font-size: 16px;
	color: #fff;
	background-color: #006400;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #0056b3;
	}
`;

const StoryContainer = styled.div`
	margin-top: 20px;
	padding: 20px;
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 5px;
`;

const ErrorMessage = styled.div`
	margin-top: 10px;
	color: red;
	text-align: center;
`;

export default Write;
