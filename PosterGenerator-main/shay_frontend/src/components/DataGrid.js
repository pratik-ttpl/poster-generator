import React, { useState } from "react";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    makeStyles,
    IconButton,
    Menu,
    MenuItem,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles({
    tableContainer: {
        maxWidth: "100%",
        overflowX: "auto",
    },
    tableRow: {
        "&:hover": {
            backgroundColor: "#e0e0e0",
        },
    },
    tableHeaderCell: {
        fontWeight: "bold",
        backgroundColor: "#f2f2f2",
    },
});

const DataGrid = ({ columns, data, actions }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleMenuOpen = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };

    const handleActionClick = (action) => {
        if (actions && actions[action] && typeof actions[action].handler === "function") {
            actions[action].handler(selectedRow);
            handleMenuClose();
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.id} className={classes.tableHeaderCell}>
                                {column.label}
                            </TableCell>
                        ))}
                        {actions && (
                            <TableCell key="actions" className={classes.tableHeaderCell}>
                                Actions
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index} className={classes.tableRow}>
                            {columns.map((column) => (
                                <TableCell key={column.id}>
                                    {/* {row[column.id]} */}
                                    {column.id === "createdDate" ? formatDate(row[column.id]) : row[column.id]}
                                </TableCell>
                            ))}
                            {actions && (
                                <TableCell key="actions">
                                    <IconButton onClick={(e) => handleMenuOpen(e, row)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                        {Object.keys(actions).map((action) => (
                                            <MenuItem key={action} onClick={() => handleActionClick(action)}>
                                                {actions[action].label}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataGrid;
