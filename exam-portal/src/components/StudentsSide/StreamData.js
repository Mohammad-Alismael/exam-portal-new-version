import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Box, Container, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import { useRadioGroup } from "@mui/material/RadioGroup";
import ArticleIcon from "@mui/icons-material/Article";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
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
const options = ["Copy Link", "Report Abuse"];

const ITEM_HEIGHT = 48;
const Image = "https://gstatic.com/classroom/themes/WorldHistory.jpg";
const styles = {
  imageSetter: {
    backgroundImage: `url(${Image})`,
  },
};
export default function StreamData() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [value, setValue] = React.useState("1");
  return (
    <>
      {" "}
      <ThemeProvider theme={theme2}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs centered>
              <TabList>
                <Tab
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "700",
                    borderBottom: "3px solid #000",
                  }}
                  label='Stream'
                  value='1'
                />
                <Tab
                  sx={{ textTransform: "capitalize", fontWeight: "700" }}
                  label='Classwork'
                  value='2'
                />
                <Tab
                  sx={{ textTransform: "capitalize", fontWeight: "700" }}
                  label='People'
                  value='3'
                />
              </TabList>
            </Tabs>
          </Box>
        </TabContext>
      </ThemeProvider>
      <Container maxWidth='md'>
        <Card
          variant='outlined'
          sx={{
            backgroundColor: "#feefe3",
            marginTop: "5rem",
            borderRadius: "15px",
            height: "100%",
          }}
        >
          <CardContent
            style={styles.imageSetter}
            sx={{
              paddingTop: "8rem",
              color: "#fff",
              backgroundPosition: "right",
            }}
          >
            <Typography variant='h4' component='div'>
              <b>BSSE</b>
            </Typography>
            <Typography variant='h6'>8th</Typography>
          </CardContent>
          <Card variant='outlined' sx={{ backgroundColor: "#fff" }}>
            <CardContent>
              <Typography variant='h6' sx={{ color: "#000" }}>
                Subject IS and data processing
              </Typography>
            </CardContent>
          </Card>
        </Card>
        {courseListing &&
          courseListing.map((data, index) => {
            return (
              <Card
                key={index}
                variant='outlined'
                sx={{ marginTop: "2rem", borderRadius: "15px" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ArticleIcon
                      sx={{
                        backgroundColor: "#e8710a",
                        color: "#fff",
                        marginRight: "1rem",
                        padding: "10px",
                        borderRadius: "50%",
                      }}
                    />
                    <div>
                      <Typography variant='p' component='div'>
                        <b> {data.name} posted a new material:</b> {data.title}
                      </Typography>
                      <Typography variant='p'>{data.date}</Typography>
                    </div>
                  </div>
                  <div>
                    <IconButton
                      aria-label='more'
                      id='long-button'
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup='true'
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id='long-menu'
                      MenuListProps={{
                        "aria-labelledby": "long-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                          boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
                        },
                      }}
                    >
                      {options.map((option) => (
                        <MenuItem
                          key={option}
                          selected={option === "Pyxis"}
                          onClick={handleClose}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
var courseListing = [
  {
    id: 0,
    name: "Akbar",
    title: "Data structure",
    date: "25 June, 2021",
  },
  {
    id: 1,
    name: "Akbar",
    title: "OOP",
    date: "26 June, 2021",
  },
  {
    id: 2,
    name: "Akbar",
    title: "Data Mining",
    date: "25 June, 2021",
  },
  {
    id: 3,
    name: "Akbar",
    title: "Data Warehousing",
    date: "29 June, 2021",
  },
  {
    id: 4,
    name: "Akbar",
    title: "Data Management",
    date: "12 August, 2021",
  },
  {
    id: 5,
    name: "Akbar",
    title: "MIS Planning",
    date: "12 August, 2021",
  },
  {
    id: 6,
    name: "Akbar",
    title: "Types of information",
    date: "12 August, 2021",
  },
];
