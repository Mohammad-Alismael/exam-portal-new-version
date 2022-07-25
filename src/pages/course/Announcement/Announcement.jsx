import React from 'react';
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

function Announcement(props) {
    return (
        <Paper elevation={5} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
            {/*<TextField*/}
            {/*    id="filled-basic"*/}
            {/*    variant="filled"*/}
            {/*    style={{height: '100px'}}*/}
            {/*    onChange={(e)=>(setAnnouncementText(e.target.value))}*/}
            {/*    label="Announce something to your class"*/}
            {/*    // startAdornment={*/}
            {/*    //     <InputAdornment position="start">*/}
            {/*    //         <Avatar alt={user['username']} src="/static/images/avatar/2.jpg" />*/}
            {/*    //     </InputAdornment>*/}
            {/*    // }*/}
            {/*/>*/}
            <TextField id="filled-basic" label="Filled" variant="filled" />
            {/*<IconButton type="submit" sx={{ p: '10px' }}onClick={postAnnouncement}>*/}
            {/*    <PublishIcon />*/}
            {/*</IconButton>*/}
        </Paper>
    );
}

export default Announcement;