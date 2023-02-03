import React, { useEffect } from "react";
import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Paper, Typography } from "@mui/material";
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
} from "@mui/x-data-grid";
import Divider from "@mui/material/Divider";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import { fetchStudentsSubmission } from "../api/services/UserSubmission";
import moment from "moment/moment";
import LinearProgress from "@mui/material/LinearProgress";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: "7% 15%",
        padding: "1rem",
        backgroundColor: "#FFF",
    },
    leftContainer: {
        width: "28%",
        backgroundColor: "blue",
    },
    rightContainer: {
        verticalAlign: "top",
        backgroundColor: "red",
        width: "63.5%",
    },
}));
const columns = [
    { field: "id", headerName: "ID", disablePadding: true },
    {
        field: "username",
        headerName: "Username",
        width: 180,
        disablePadding: true,
    },
    {
        field: "emailId",
        headerName: "Email Id",
        width: 180,
        disablePadding: true,
    },
    {
        field: "examStatus",
        headerName: "Exam Status",
        type: "string",
        width: 100,
        disablePadding: true,
    },
    {
        field: "grade",
        headerName: "Grade",
        type: "number",
        width: 60,
        disablePadding: true,
    },
    {
        field: "submittedAt",
        headerName: "Submitted At",
        type: "string",
        width: 250,
        disablePadding: true,
    },
];
function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{ float: "right" }}>
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
const getExamStatus = (totalPoints) => {
    if (totalPoints == null) return "not corrected";
    return "corrected";
};
const getSubmittedAt = (submittedAt) => {
    if (submittedAt == null) return "didn't submit";
    return moment(submittedAt).format("MMMM Do YYYY, h:mm:ss a");
};
function GradesPage(props) {
    const { examId } = useParams();
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const [rows, setRows] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        const controller = new AbortController();
        fetchStudentsSubmission(examId, controller).then((data) => {
            const rows_ = data.map(
                ({ total_points, submitted_at, studentInfo }, i) => {
                    return {
                        id: i + 1,
                        username: studentInfo["username"],
                        emailId: studentInfo["email"],
                        grade: total_points,
                        examStatus: getExamStatus(total_points),
                        submittedAt: getSubmittedAt(submitted_at),
                    };
                }
            );

            setRows(rows_);
            setIsLoading(false);
        });
        return () => {
            controller.abort();
        };
    }, []);
    const redirect = (params) => {
        navigate(`${params.row.username}`);
    };
    return (
        <div>
            <ResponsiveAppBar />
            {isLoading ? (
                <LinearProgress />
            ) : (
                <>
                    <Typography variant="h4" align={"left"} sx={{ mb: 3 }}>
                        Exam Grades
                    </Typography>
                    <Paper fullwidth elevation={5} className={classes.container}>
                        <div style={{ height: 450, width: "100%" }}>
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
                </>
            )}
        </div>
    );
}

export default GradesPage;
