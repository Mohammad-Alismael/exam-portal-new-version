import Toolbar from "@material-ui/core/Toolbar";
import logo from "../img/logo.png";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useStyles} from "../GlobalStyles/GlobalStyles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import TabPanel from "../Components/TabPanel";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";

function HomePageInstructor() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    return (
        <div>
            <AppBar position="fixed" color="white" elevation={0} >
                <Toolbar style={{ margin: '0 10%'}}>
                    <img src={logo} className={classes.logo} alt="Exam Portal" />
                    <Box sx={{ borderBottom: 0, borderColor: 'divider' }} style={{marginLeft:'20%'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Classwork" {...a11yProps(0)} />
                            <Tab label="People" {...a11yProps(1)} />
                            {/*<Tab label="" {...a11yProps(2)} />*/}
                        </Tabs>
                    </Box>

                </Toolbar>
            </AppBar>
            <Container  maxWidth="xl" xl={12} md={12} sm={12} style={{ backgroundColor: '#161b22', padding: '7%' }}>
                <Card>
                    <TabPanel value={value} index={0}>
                        Item One
                    </TabPanel>
                </Card>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            </Container>
        </div>
    )
}

export default HomePageInstructor;

