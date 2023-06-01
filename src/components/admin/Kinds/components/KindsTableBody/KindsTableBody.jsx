import {
    Box,
    Button,
    IconButton,
    TableBody,
    TableCell,
    TableRow,
    TextField
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";

const KindsTableBody = ({ data, handleEdit }) => {
    const [values, setValues] = useState([]);
    const [idArr, setIdArr] = useState([]);

    useEffect(() => {
        setValues(JSON.parse(JSON.stringify(data)));
    }, [data]);

    const handleClickEdit = index => {
        if (!idArr.includes(index)) {
            setIdArr(prev => [...prev, index]);
        } else {
            setIdArr(prev => prev.filter(item => item !== index));
            setValues(JSON.parse(JSON.stringify(data)));
        }
    };

    const handleChangeKind = (value, id) => {
        let result = [...values];
        result = result.map(item => {
            if (item.id === id) {
                item.title = value;
            }
            return item;
        });
        setValues(result);
    };

    return (
        <TableBody>
            {values.map((row, index) => {
                return (
                    <TableRow
                        key={row.id}
                        sx={{
                            "&:last-child td, &:last-child th": { border: 0 }
                        }}
                    >
                        <TableCell>
                            <IconButton
                                onClick={() => handleClickEdit(index)}
                                size="small"
                            >
                                <EditIcon />
                            </IconButton>
                        </TableCell>
                        <TableCell>{row.id}</TableCell>
                        {idArr.includes(index) ? (
                            <TableCell>
                                <Box display="flex" gap={1}>
                                    <TextField
                                        value={row.title}
                                        onChange={e =>
                                            handleChangeKind(
                                                e.target.value,
                                                row.id
                                            )
                                        }
                                        size="small"
                                        label="Title"
                                    />
                                    <Button
                                        onClick={() => {
                                            handleEdit(row.id, row.title);
                                            handleClickEdit(index);
                                        }}
                                        variant="contained"
                                    >
                                        Edit
                                    </Button>
                                </Box>
                            </TableCell>
                        ) : (
                            <TableCell>{row.title}</TableCell>
                        )}
                    </TableRow>
                );
            })}
        </TableBody>
    );
};

export { KindsTableBody };
