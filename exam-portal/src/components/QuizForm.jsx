import React from "react";
import {
  color,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  Button,
  Checkbox,
  Radio,
  CheckboxGroup,
  RadioGroup,
  Select,
  Input,
} from "@chakra-ui/react";

const QuizForm = () => {
  return (
    <Stack backgroundColor={"#ede7f6"} height={"auto"} py={"4"}>
      <Container style={{ maxWidth: "80ch", paddingTop: "1rem" }}>
        <Stack
          direction={"column"}
          width={"100%"}
          backgroundColor={"white"}
          borderRadius={"10px"}
          border={"1px solid #dadce0"}
          borderTop={"10px solid rgb(103 58 183)"}
          mb={"1rem"}
        >
          <VStack
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"flex-start"}
          >
            <Heading size={"lg"} px={"2rem"} py={"1rem"}>
              {" "}
              Quiz
            </Heading>
            <HStack
              height={"1px"}
              width={"100%"}
              color={"#dadce0"}
              backgroundColor={"#dadce0"}
            />

            <Stack
              direction={"row"}
              display={"flex"}
              px={"2rem"}
              py={"1rem"}
              width={"100%"}
              justifyContent={"space-between"}
            >
              <Heading size={"sm"} color={"#5f6368"}>
                youremail@domain.com
              </Heading>
              {/* <Text color={"#5f6368"}>Draft restored</Text> */}
            </Stack>
          </VStack>
        </Stack>

        <Stack
          direction={"column"}
          width={"100%"}
          backgroundColor={"white"}
          borderRadius={"10px"}
          border={"1px solid #dadce0"}
          px={"1.4rem"}
          py={"1.4rem"}
          mb={"1rem"}
        >
          <Heading size={"sm"} pb={"1rem"}>
            Question 1....?
          </Heading>
          <Stack>
            <Checkbox
              size='lg'
              colorScheme='green'
              style={{ borderRadius: "50% !important" }}
            >
              Option 1
            </Checkbox>
            <Checkbox size='lg' colorScheme='green'>
              Option 2
            </Checkbox>
            <Checkbox size='lg' colorScheme='green'>
              Option 3
            </Checkbox>
            <Checkbox size='lg' colorScheme='green'>
              Option 4
            </Checkbox>
          </Stack>
        </Stack>

        <Stack
          direction={"column"}
          width={"100%"}
          backgroundColor={"white"}
          borderRadius={"10px"}
          border={"1px solid #dadce0"}
          px={"1.4rem"}
          py={"1.4rem"}
          mb={"1rem"}
        >
          <Heading size={"sm"} pb={"1rem"}>
            Question 2....?
          </Heading>
          <RadioGroup>
            <Stack>
              <Radio size={"lg"}>True</Radio>
              <Radio size={"lg"}>False</Radio>
            </Stack>
          </RadioGroup>
        </Stack>

        <Stack
          direction={"column"}
          width={"100%"}
          backgroundColor={"white"}
          borderRadius={"10px"}
          border={"1px solid #dadce0"}
          px={"1.4rem"}
          py={"1.4rem"}
          mb={"1rem"}
        >
          <Heading size={"sm"} pb={"1rem"}>
            Question 3....?
          </Heading>
          <Stack>
            <Select size={"lg"} placeholder='Select option'>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
          </Stack>
        </Stack>

        <Stack
          direction={"column"}
          width={"100%"}
          backgroundColor={"white"}
          borderRadius={"10px"}
          border={"1px solid #dadce0"}
          px={"1.4rem"}
          py={"1.4rem"}
          mb={"1rem"}
        >
          <Heading size={"sm"} pb={"1rem"}>
            Question 4....??
          </Heading>
          <Stack>
            <Input variant='flushed' placeholder='Type here' />
          </Stack>
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"} py={"1rem"}>
          <Button colorScheme='teal' variant='solid'>
            Submit
          </Button>
          <Button colorScheme='teal' variant='ghost'>
            Clear form
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
};

export default QuizForm;
