import { TableCell, TableHead, TableRow } from "@mui/material";

const KindsTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>id</TableCell>
                <TableCell>Title</TableCell>
            </TableRow>
        </TableHead>
    );
};

export { KindsTableHead };
