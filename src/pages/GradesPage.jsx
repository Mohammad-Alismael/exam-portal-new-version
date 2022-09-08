import React, {useEffect} from 'react';
import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import {Paper, Typography} from "@mui/material";
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import Divider from "@mui/material/Divider";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import Button from "@mui/material/Button";
import Pagination from '@mui/material/Pagination';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: "7% 15%",
        padding: "1rem",
        backgroundColor: '#FFF',
    },
    leftContainer: {
        width: '28%',
        backgroundColor: 'blue'
    },
    rightContainer: {
        verticalAlign: 'top',
        backgroundColor: 'red',
        width: '63.5%',
    }

}));
const columns = [
    { field: 'id', headerName: 'ID'},
    { field: 'username', headerName: 'Username',width: 180 },
    { field: 'emailId', headerName: 'Email Id', width: 180 },
    { field: 'examStatus', headerName: 'Exam Status',type: 'string',width: 150},
    {field: 'grade', headerName: 'Grade', type: 'number',width: 100},
    { field: 'submittedAt', headerName: 'Submitted At',type: 'string',width: 180},

];
const rows = [
    { id: 1, emailId: 'Snow@gmail.com', username: 'Jon',examStatus: 'corrected', grade: 35, submittedAt: '23.08.2022' },
    { id: 2, emailId: 'Jones@gmail.com', username: 'Jones',examStatus: 'corrected', grade: 55, submittedAt: '23.08.2022' },
    { id: 3, emailId: 'Mamduh@gmail.com', username: 'Mamduh',examStatus: 'not corrected', grade: null, submittedAt: "didn't submit" },

];
function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{float: 'right'}}>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}
function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            color="primary"
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}
function GradesPage(props) {
    const { examId } = useParams();
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate()
    useEffect(()=>{
        console.log(location.pathname.split('/'))
    },[])
    const redirect = (params) => {
        const a = location.pathname.split('/')
            // ${a[1]}/${a[2]}/${a[3]}/${a[4]}/
        navigate(`${params.row.username}`)
    }
    return (
        <div>
            <ResponsiveAppBar />
            <Paper fullwidth elevation={5} className={classes.container}>
                <Typography variant="h4" align={'left'} sx={{mb:3}}>
                    Exam Grades
                </Typography>
                {/*<Button variant="contained" startIcon={<CreateNewFolderIcon />}>*/}
                {/*    Excel Sheet*/}
                {/*</Button>*/}
                    <div style={{ height: 450, width: '100%' }}>
                        <DataGrid
                            onRowClick={redirect}
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            components={{
                                Toolbar: CustomToolbar,
                                Pagination: CustomPagination,
                            }}
                        />
                    </div>
            </Paper>
        </div>
    );
}

export default GradesPage;