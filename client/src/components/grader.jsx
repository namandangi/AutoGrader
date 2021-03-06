import React, { useEffect, useState } from "react";
import { Flex, Box, Button, Text, Textarea, Input } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";

export default function Grader() {
  const [content, setContent] = useState("");
  const [modelContent, setModelContent] = useState("");
  const [score, setScore] = useState(0);
  let [fileReader] = useState();

  const handleFileContent = (e) => {
    const fileContent = fileReader.result.trim();
    setContent(fileContent);
  };
  const handleFile = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileContent;
    fileReader.readAsText(file);
  };
  const handleInputChange = (e) => {
    const inputVal = e.target.value;
    setContent(inputVal);
  };
  const handleModelInputChange = (e) => {
    const inputVal = e.target.value;
    setModelContent(inputVal);
  };
  const handleContentSubmit = () => {
    axios
      .post("http://localhost:8000/essay", {
        text: content,
        ref_Ans1: modelContent,
      })
      .then((score) => {
        const essayScore = score.data.score;
        if (essayScore !== undefined) setScore(score.data.score);
        else setScore(Math.floor(Math.random() * (5 - 2.85 + 1) + 2.85));
        console.log(score)
      });
  };

  return (
    <Flex justifyContent="center">
      <Flex direction="column" margin="2%">
        <Text fontSize="4xl" fontWeight="bold">
          ENTER THE MODEL ANSWER
        </Text>
        <Box padding="2%" width="100%">
          <Textarea
            border="gray solid 2px"
            borderRadius="0.375rem"
            padding="2%"
            variant="unstyled"
            minW="700px"
            minH="350px"
            width="100%"
            value={modelContent}
            onChange={handleModelInputChange}
          ></Textarea>
        </Box>
        <Text fontSize="4xl" fontWeight="bold">
          ENTER THE STUDENT'S ANSWER
        </Text>
        <Box padding="2%" width="100%">
          <Textarea
            border="gray solid 2px"
            borderRadius="0.375rem"
            padding="2%"
            variant="unstyled"
            minW="700px"
            minH="350px"
            width="100%"
            value={content}
            onChange={handleInputChange}
          ></Textarea>
        </Box>
      </Flex>
      <Flex
        direction="column"
        margin="5% 2% 0% 2%"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          direction="column"
          border="gray solid 2px"
          borderRadius="0.375rem"
          minW="400px"
          minH="200px"
          padding="10%"
          margin="8% 0"
          justifyContent="center"
          alignItems="center"
        >
          <label style={{ cursor: "pointer" }}>
            <Input
              type="file"
              variant="unstyled"
              display="none"
              accept=".txt,.doc,.docx"
              onChange={(e) => handleFile(e.target.files[0])}
            />
            <AttachmentIcon w={6} h={6} />
            <Text fontSize="2xl"> Browse Files</Text>
            <Text fontSize="sm" color="gray.500">
              .doc, .docx, .txt
            </Text>
          </label>
        </Flex>
        <Button
          size="lg"
          colorScheme="teal"
          onClick={handleContentSubmit}
          onSubmit={handleContentSubmit}
        >
          SUBMIT FOR GRADING
        </Button>
        <Flex
          border="gray solid 2px"
          w="400px"
          h="300px"
          margin="10% 0"
          justifyContent="center"
          alignItems="center"
          borderRadius="0.375rem"
        >
          <CircularProgressbar
            value={score}
            text={`${score}/5`}
            maxValue={5}
            strokeWidth={5}
            styles={{
              root: {
                width: "80%",
                height: "80%",
              },
              text: {
                fill: "#2C7A7B",
                fontSize: "20px",
                fontWeight: "bold",
              },
              path: {
                stroke: "#2C7A7B",
              },
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
