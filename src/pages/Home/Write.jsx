import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Write = () => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [locations, setLocations] = useState("");
	const [prompt, setPrompt] = useState("");
	const [story, setStory] = useState("");
	const [error, setError] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setStory("");

		try {
			const response = await axios.post("http://44.200.180.53:5000/generate_story", {
				title,
				author,
				locations: locations.split(",").map((loc) => loc.trim()),
				prompt,
			});

			console.log("Response data:", response.data);

			if (response.data.story) {
				setStory(response.data.story);
			} else {
				setError("이야기를 생성하는 데 실패했습니다.");
			}
		} catch (error) {
			console.error("Error generating story:", error);
			setError("서버와의 통신 중 오류가 발생했습니다.");
		}
	};

	const handleSave = async () => {
		if (!title || !author || !locations || !story) {
			setError("모든 필드를 입력해야 합니다.");
			return;
		}

		try {
			const requestData = {
				title,
				author,
				location: locations.split(",").map((loc) => loc.trim()).join(", "),
				story,
				image_url: imageUrl || undefined,
			};

			console.log("Request Data:", requestData);

			const response = await axios.post("http://44.200.180.53:5000/add_story", requestData);

			if (response.status === 201) {
				alert("이야기가 성공적으로 저장되었습니다.");
				navigate("/");
			} else {
				setError("이야기를 저장하는 데 실패했습니다.");
			}
		} catch (error) {
			console.error("Error saving story:", error);
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
					placeholder="예) 한라산, 성산일출봉, 오설록테마파크"
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
					<Label>AI가 생성한 이야기:</Label>
					<Textarea
						value={story}
						onChange={(e) => setStory(e.target.value)}
						rows={5}
					></Textarea>
					<StyledButton type="button" onClick={handleSave}>저장</StyledButton>
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
    width: 100%;
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
	width: 100%;

	&:hover {
		background-color: #0056b3;
	}
`;

const StyledButton = styled(Button)`
	margin-top: 10px;
`;

const StoryContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
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
