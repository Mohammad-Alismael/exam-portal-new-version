import {
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { Stack } from "@mui/material";
import React, { useState } from "react";

const Classwork = () => {
  const tabArray = [
    {
      quizName: "Quiz 1",
      dueDate: "10/12/2021",
    },
    {
      quizName: "Quiz 2",
      dueDate: "14/12/2021",
    },
  ];

  const [tabShow, settabShow] = useState(false);
  return (
    <Stack direction={"column"} py={"1rem"}>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        color={"#007b83"}
      >
        {/* <span style={{ fontWeight: "500" }}>
          <i class='far fa-address-book'></i> View Your Work
        </span> */}
      </Stack>
      <Container pt={"2rem"} maxWidth={"90ch"}>
        <Accordion>
          {tabArray.map((obj, ind) => (
            <AccordionItem key={ind}>
              <h2>
                <AccordionButton onClick={() => settabShow(!tabShow)}>
                  <span
                    style={{
                      color: "#007b83",
                      fontSize: "2rem",
                      marginRight: "1rem",
                    }}
                  >
                    <i class='fas fa-clipboard' color={"#007b83"}></i>
                  </span>
                  <Box flex='1' textAlign='left'>
                    {obj.quizName}
                  </Box>

                  <Text>{obj.dueDate}</Text>
                </AccordionButton>
              </h2>
              {tabShow ? (
                <AccordionPanel pb={4}>Quiz description</AccordionPanel>
              ) : null}
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Stack>
  );
};

export default Classwork;
