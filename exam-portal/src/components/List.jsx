import { Grid, Typography } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import "./ListPage.css";
import { makeStyles } from "@mui/styles";

function List({ title, date }) {
  const classes = useStyles();

  return (
    <Grid container item xs={10} className={classes.root}>
      <Grid item xs={1}>
        <EventNoteIcon color='action' />
      </Grid>
      <Grid item xs={9}>
        <Typography className={classes.title}>{title}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography className={classes.date}>{date}</Typography>
      </Grid>
    </Grid>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
    borderBottom: "1px solid grey",
    paddingBottom: "10px",
  },
  date: {
    color: "grey",
  },
  title: {
    fontWeight: "500",
    color: "black",
  },
}));

export default List;
