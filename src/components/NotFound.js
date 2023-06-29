import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
 const NotFound = ({ error }) => {
  return (
    <Box textAlign="center" mt={10}>
      {error ? (
        <div>
          <Typography variant="h5" style={{color: '#fff'}}>Error fetching data</Typography>
          <Typography variant="body1" style={{color: '#fff'}} mt={2}>
            Sorry, there was a problem fetching the data for this page.
          </Typography>
            <Typography variant="body1" style={{color: '#fff'}} mt={2}>
                {error}
          </Typography>
        </div>
      ) : (
        <div>
          <Typography variant="h1">404</Typography>
          <Typography variant="h5">Page not found</Typography>
          <Typography variant="body1" mt={2}>
            Sorry, the page you are looking for could not be found.
          </Typography>
          <Button variant="contained" color="primary" mt={4}>
            Go to Home
          </Button>
        </div>
      )}
    </Box>
  );
};

export default NotFound;

