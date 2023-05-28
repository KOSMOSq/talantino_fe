import { Table, TableContainer } from "@mui/material";

const AdminTable = ({
    data,
    setDataToDelete,
    setOpenModal,
    AdminTableHead,
    AdminTableBody
}) => {
    return (
        <TableContainer>
            <Table>
                <AdminTableHead />
                <AdminTableBody
                    data={data}
                    setDataToDelete={setDataToDelete}
                    setOpenModal={setOpenModal}
                />
            </Table>
        </TableContainer>
    );
};

export { AdminTable };
