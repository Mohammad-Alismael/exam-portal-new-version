import React from 'react';
import PropTypes from 'prop-types';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import DialogActions from "@mui/material/DialogActions";
import CardMedia from "@mui/material/CardMedia";

function DefaultImages({open,onClose}) {

    const selectImg = (e) =>{
        console.log(e.target.src)
    }


    return (
        <Dialog direction="up" open={open} onClose={onClose}>
        <DialogContent>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 12 }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val,index) => (
                    <Grid item xs={4} sm={4} md={4} key={index}>
                        <img onClick={selectImg} style={{ height: '100%',width: '100%'}} src={`http://localhost:8081/default-backgrounds/ep_option${val}.png`}  alt={index}/>
                    </Grid>
                ))}
            </Grid>
        </DialogContent>
    </Dialog>
    );
}

DefaultImages.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    callbackfn: PropTypes.func
};

export default DefaultImages;