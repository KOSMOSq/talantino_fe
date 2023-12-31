import { TableCell, TableHead, TableRow } from "@mui/material";

const TalentsTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Delete&nbsp;user</TableCell>
                <TableCell align="right">Unblock</TableCell>
                <TableCell align="right">id</TableCell>
                <TableCell align="right">Account&nbsp;Status</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Surname</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Kind&nbsp;of&nbsp;talent</TableCell>
                <TableCell align="right">DeletionDate</TableCell>
                <TableCell align="right">
                    Verification&nbsp;ExpireDate
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export { TalentsTableHead };
