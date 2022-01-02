import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Container, Link, Radio } from "@mui/material";
import PropTypes from "prop-types";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const theme2 = createTheme({
  typography: {
    h6: {
      fontSize: 32,
      marginTop: -40,
      color: "#161b22",
    },
  },
  palette: {
    primary: {
      main: "rgb(22,27,34)",
    },
    secondary: {
      main: "#ffd05e",
    },
  },
});
const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));
export default function QuizShow(props) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  function consoleCheck(data) {
    console.log("asdasdas", data);
  }
  return (
    <>
      {" "}
      <ThemeProvider theme={theme2}>
        <AppBar sx={{ position: "fixed", bgcolor: "#ffd05e" }}>
          <Toolbar>
            <Typography
              style={{ color: "black" }}
              sx={{ ml: 2, flex: 1 }}
              variant='h6'
              component='div'
            >
              Exam / Quiz
            </Typography>
            <Button style={{ textTransform: "none" }} color='inherit'>
              Assign
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <Container maxWidth='md'>
        <Box sx={{ minWidth: 500, marginTop: "5rem" }}>
          <Card variant='outlined'>
            <CardContent>
              <Typography variant='h4' component='div'>
                Math_Assignment
              </Typography>
              <Typography variant='h6'>well meaning and kindly.</Typography>
            </CardContent>
          </Card>
        </Box>
        {questionsListing &&
          questionsListing.map((data, index) => {
            return (
              <Box key={index} sx={{ minWidth: 500, marginTop: "1rem" }}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography
                      variant='h6'
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      component='div'
                    >
                      Q{index + 1}. {data.title}
                      <Typography variant='text' component='div'>
                        {data.marks ? data.marks : "2"} points
                      </Typography>
                    </Typography>
                    {data &&
                      data.questionOptions &&
                      data.questionOptions.map((option, index) => {
                        console.log("asdasdas", index);
                        return (
                          <RadioGroup
                            key={index}
                            sx={{ marginTop: "1rem" }}
                            name='use-radio-group'
                          >
                            {/* {
                                                            option === option.option2 ?
                                                                <>
                                                                    <MyFormControlLabel onClick={(e) => consoleCheck(e.target.value)} value={option.option1 ? option.option1 : ""} label={option.option1 ? option.option1 : ""} control={<Radio />} />
                                                                    <MyFormControlLabel onClick={(e) => consoleCheck(e.target.value)} value={option.option2 ? option.option2 : ""} label={option.option2 ? option.option2 : ""} control={<Radio />} />
                                                                </>
                                                                :
                                                                <> */}
                            <MyFormControlLabel
                              onClick={(e) => consoleCheck(e.target.value)}
                              value={option.option1 ? option.option1 : ""}
                              label={option.option1 ? option.option1 : ""}
                              control={<Radio />}
                            />
                            <MyFormControlLabel
                              onClick={(e) => consoleCheck(e.target.value)}
                              value={option.option2 ? option.option2 : ""}
                              label={option.option2 ? option.option2 : ""}
                              control={<Radio />}
                            />
                            <MyFormControlLabel
                              onClick={(e) => consoleCheck(e.target.value)}
                              value={option.option3 ? option.option3 : ""}
                              label={option.option3 ? option.option3 : ""}
                              control={<Radio />}
                            />
                            <MyFormControlLabel
                              onClick={(e) => consoleCheck(e.target.value)}
                              value={option.option4 ? option.option4 : ""}
                              label={option.option4 ? option.option4 : ""}
                              control={<Radio />}
                            />
                            {/* </>
                                                        } */}
                          </RadioGroup>
                        );
                      })}
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        <Box sx={{ minWidth: 500, marginTop: "1rem" }}>
          <Card variant='outlined'>
            <CardContent>
              <Typography
                variant='h6'
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                component='div'
              >
                Q2.
                <Typography variant='text' component='div'>
                  2 points
                </Typography>
              </Typography>
              <RadioGroup sx={{ marginTop: "1rem" }} name='use-radio-group'>
                <MyFormControlLabel
                  value='true'
                  label='True'
                  control={<Radio />}
                />
                <MyFormControlLabel
                  value='false'
                  label='False'
                  control={<Radio />}
                />
              </RadioGroup>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ minWidth: 500, marginTop: "1rem" }}>
          <Card variant='outlined'>
            <CardContent>
              <Typography
                variant='h6'
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                component='div'
              >
                Q3.
                <Typography variant='text' component='div'>
                  2 points
                </Typography>
              </Typography>
              <RadioGroup
                sx={{ marginTop: "1rem" }}
                name='use-radio-group'
                defaultValue='first'
              >
                <MyFormControlLabel
                  value='first'
                  label='First'
                  control={<Radio />}
                />
                <MyFormControlLabel
                  value='second'
                  label='Second'
                  control={<Radio />}
                />
                <MyFormControlLabel
                  value='third'
                  label='Third'
                  control={<Radio />}
                />
                <MyFormControlLabel
                  value='fourth'
                  label='Fourth'
                  control={<Radio />}
                />
              </RadioGroup>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ minWidth: 500, marginTop: "1rem" }}>
          <Card variant='outlined'>
            <CardContent>
              <Typography
                variant='h6'
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                component='div'
              >
                Q4.
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id='demo-simple-select-label'>
                    Question
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={age}
                    label='Question'
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant='text' component='div'>
                  2 points
                </Typography>
              </Typography>
              <RadioGroup
                sx={{ marginTop: "1rem" }}
                name='use-radio-group'
                defaultValue='first'
              >
                <MyFormControlLabel
                  value='first'
                  label='First'
                  control={<Radio />}
                />
                <MyFormControlLabel
                  value='second'
                  label='Second'
                  control={<Radio />}
                />
                <MyFormControlLabel
                  value='third'
                  label='Third'
                  control={<Radio />}
                />
                <MyFormControlLabel
                  value='fourth'
                  label='Fourth'
                  control={<Radio />}
                />
              </RadioGroup>
            </CardContent>
          </Card>
        </Box>
        <Link href='/congratualtions-view'>
          <Button sx={{ marginTop: "1rem" }} variant='contained'>
            Next
          </Button>
        </Link>
      </Container>
    </>
  );
}
function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
  /**
   * The value of the component.
   */
  value: PropTypes.any,
};
var questionsListing = [
  {
    id: 0,
    title: "Data structure",
    marks: "2",
    questionOptions: [
      {
        option1: "Data structure",
        option2: "structure",
        option3: "Data",
        option4: "Quality",
      },
    ],
  },
  {
    id: 1,
    title: "OOP",
    marks: "3",
    questionOptions: [
      {
        option1: "Hola",
        option2: "structure",
        option3: "Data",
        option4: "Quality",
      },
    ],
  },
  {
    id: 2,
    title: "Data Mining",
    marks: "1",
    questionOptions: [
      {
        option1: "Data structure",
        option2: "Yelo",
        option3: "Data",
        option4: "Quality",
      },
    ],
  },
  {
    id: 3,
    title: "Data Warehousing",
    marks: "2",
    questionOptions: [
      {
        option1: "Yes",
        option2: "No",
      },
    ],
  },
  {
    id: 4,
    title: "Data Management",
    marks: "1",
    questionOptions: [
      {
        option1: "Data structure",
        option2: "structure",
        option3: "Data",
        option4: "Quality",
        option4: "Information",
      },
    ],
  },
  {
    id: 5,
    title: "MIS Planning",
    marks: "1",
    questionOptions: [
      {
        option1: "Data structure",
        option2: "structure",
        option3: "Data",
        option4: "Transfer",
      },
    ],
  },
  {
    id: 6,
    title: "Types of information",
    marks: "3",
    questionOptions: [
      {
        option1: "Data structure",
        option2: "Flash",
        option3: "Data",
        option4: "Quality",
      },
    ],
  },
];
