import React from 'react';
import PropTypes from 'prop-types';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import {useDispatch} from "react-redux";
import {SET_BACKGROUND_OBJECT_FILE, SET_NEW_COURSE_NAME} from "../../store/actions";
import {BASE_URL} from "../../api/axios";
import {dataURLtoFile, toDataURL} from "../../utils/global/GlobalConstants";

function DefaultImages({open,setDefaultImgOpen}) {
    const dispatch = useDispatch();

    const selectImg = (e) =>{
        const url = e.target.src
        const fileName = url.split("/")[4];

        toDataURL(url)
            .then(dataUrl => {
                const fileData = dataURLtoFile(dataUrl, fileName);
                dispatch({ type: SET_BACKGROUND_OBJECT_FILE, payload: { backgroundFileObject: fileData } });
                setDefaultImgOpen(false)
            })
    }


    return (
        <Dialog direction="up" open={open} onClose={()=>(setDefaultImgOpen(false))}>
        <DialogContent>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 12 }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val,index) => (
                    <Grid item xs={4} sm={4} md={4} key={index}>
                        <img onClick={selectImg} style={{ height: '100%',width: '100%'}} src={`${BASE_URL}/default-backgrounds/ep_option${val}.png`}  alt={index}/>
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