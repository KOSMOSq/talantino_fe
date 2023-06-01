import { Table, TableContainer } from "@mui/material";

const AdminTable = ({
    data,
    setDataToDelete,
    setOpenModal,
    AdminTableHead,
    AdminTableBody,
    handleEdit,
    setTalentToUnblock,
    setOpenUnblock
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
                    setTalentToUnblock={setTalentToUnblock}
                    setOpenUnblock={setOpenUnblock}
                />
            </Table>
        </TableContainer>
    );
};

export { AdminTable };
