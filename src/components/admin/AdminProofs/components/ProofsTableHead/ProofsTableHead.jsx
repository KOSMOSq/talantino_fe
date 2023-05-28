import { TableCell, TableHead, TableRow } from "@mui/material";

const ProofsTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Proof&nbsp;id</TableCell>
                <TableCell align="right">Author&nbsp;id</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Created</TableCell>
            </TableRow>
        </TableHead>
    );
};

export { ProofsTableHead };
