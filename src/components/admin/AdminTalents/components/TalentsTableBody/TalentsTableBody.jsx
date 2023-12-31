import { IconButton, TableBody, TableCell, TableRow } from "@mui/material";
import { getBeautifulTimeString } from "../../../../../shared/functions/getRelativeTime";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";

const TalentsTableBody = ({
    data,
    setDataToDelete,
    setOpenModal,
    setTalentToUnblock,
    setOpenUnblock
}) => {
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
                        <TableCell align="right">
                            {row.accountStatus === "INACTIVE" ? (
                                <IconButton
                                    onClick={() => {
                                        setOpenUnblock(prev => !prev);
                                        setTalentToUnblock(row);
                                    }}
                                    size="small"
                                >
                                    <CheckCircleIcon sx={{ color: "green" }} />
                                </IconButton>
                            ) : null}
                        </TableCell>
                        <TableCell align="right">
                            <Link
                                href={`/talent/${row.id}`}
                                to={`/talent/${row.id}`}
                            >
                                {row.id}
                            </Link>
                        </TableCell>
                        <TableCell align="right">{row.accountStatus}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.surname}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.kind}</TableCell>
                        <TableCell align="right">
                            {row.deletionDate
                                ? getBeautifulTimeString(row.deletionDate)
                                : "null"}
                        </TableCell>
                        <TableCell align="right">
                            {row.verificationExpireDate
                                ? getBeautifulTimeString(
                                      row.verificationExpireDate
                                  )
                                : "null"}
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
};

export { TalentsTableBody };
