import { Table, TableContainer } from "@mui/material";

const AdminTable = ({
    data,
    setDataToDelete,
    setOpenModal,
    AdminTableHead,
    AdminTableBody,
    handleEdit
}) => {
    return (
        <TableContainer>
            <Table>
                <AdminTableHead />
                <AdminTableBody
                    data={data}
                    setDataToDelete={setDataToDelete}
                    setOpenModal={setOpenModal}
                    handleEdit={handleEdit}
                />
            </Table>
        </TableContainer>
    );
};

export { AdminTable };
