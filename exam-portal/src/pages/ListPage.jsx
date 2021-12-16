import { Grid } from "@mui/material";
import List from "../components/List";

function ListPage() {
  return (
    <Grid container item xs={12} justifyContent='center'>
      <Grid item xs={10}>
        <List title='Quiz 1' date='no due date' />
      </Grid>
      <Grid item xs={10}>
        <List title='Quiz 2' date='Date Oct 21. 12.26PM' />
      </Grid>
      <Grid item xs={10}>
        <List title='Quiz 3' date='Date Oct 21. 12.26PM' />
      </Grid>
      <Grid item xs={10}>
        <List title='Quiz 4' date='Date Oct 21. 12.26PM' />
      </Grid>
    </Grid>
  );
}

export default ListPage;
