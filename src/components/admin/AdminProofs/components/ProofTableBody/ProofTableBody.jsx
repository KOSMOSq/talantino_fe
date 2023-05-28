import { IconButton, TableBody, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import { getBeautifulTimeString } from "../../../../../shared/functions/getRelativeTime";
import CancelIcon from "@mui/icons-material/Cancel";

const ProofTableBody = ({ data, setDataToDelete, setOpenModal }) => {
    return (
        <TableBody>
            {data.map(row => (
                <TableRow
                    key={row.authorId + ` ${row.proofId}`}
                    sx={{
                        "&:last-child td, &:last-child th": { border: 0 }
                    }}
                >
                    <TableCell>
                        <IconButton
                            onClick={() => {
                                setOpenModal(prev => !prev);
                                setDataToDelete(row);
                            }}
                            size="small"
                        >
                            <CancelIcon sx={{ color: "red" }} />
                        </IconButton>
                    </TableCell>

                    <TableCell align="right">{row.proofId}</TableCell>
                    <TableCell align="right">
                        <Link
                            href={`/talent/${row.authorId}`}
                            to={`/talent/${row.authorId}`}
                        >
                            {row.authorId}
                        </Link>
                    </TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">
                        {getBeautifulTimeString(row.date)}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export { ProofTableBody };
