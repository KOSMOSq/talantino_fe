import { IconButton, TableBody, TableCell, TableRow } from "@mui/material";
import { getBeautifulTimeString } from "../../../../../shared/functions/getRelativeTime";
import CancelIcon from "@mui/icons-material/Cancel";

const TalentsTableBody = ({ data, setDataToDelete, setOpenModal }) => {
    return (
        <TableBody>
            {data.map(row => {
                return (
                    <TableRow
                        key={row.name + ` ${row.id}`}
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
                        <TableCell>{row.id}</TableCell>
                        <TableCell align="right">{row.accountStatus}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.surname}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.kind}</TableCell>
                        <TableCell align="right">
                            {row.verificationExpireDate
                                ? getBeautifulTimeString(
                                      row.verificationExpireDate
                                  )
                                : "null"}
                        </TableCell>
                        <TableCell align="right">
                            {row.deletionDate
                                ? getBeautifulTimeString(row.deletionDate)
                                : "null"}
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
};

export { TalentsTableBody };
