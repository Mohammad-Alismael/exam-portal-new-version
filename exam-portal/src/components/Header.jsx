import {
  Avatar,
  Box,
  HStack,
  Stack,
  Tab,
  TabList,
  Text,
  Tabs,
} from "@chakra-ui/react";

import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={"1rem"}
      minHeight={"4rem"}
      borderBottom={"1px solid black"}
    >
      <Box>
        <Text>CS434</Text>
      </Box>
      <Box>
        <HStack mt={"16px"}>
          <Tabs>
            <TabList borderColor={"transparent"}>
              <Tab fontWeight={"bold"} py={"1rem"} boxShadow={"transparent"}>
                <Link to='/'> Stream</Link>
              </Tab>
              <Tab fontWeight={"bold"} py={"1rem"}>
                <Link to='/classwork'>Classwork</Link>
              </Tab>
              <Tab fontWeight={"bold"} py={"1rem"}>
                <Link to='/quizform'>Quiz</Link>
              </Tab>
            </TabList>
          </Tabs>
        </HStack>
      </Box>
      <Box>
        <HStack>
          <Avatar
            name='Bilal'
            src='https:///bit.ly/dan-abramov'
            size={"sm"}
          ></Avatar>
        </HStack>
      </Box>
    </Stack>
  );
};

export default Header;
