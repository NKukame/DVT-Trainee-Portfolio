import { Pagination, Box } from "@mui/material";

export default function PaginationControls({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: 'flex', flex:1, justifyContent: 'center', alignSelf:'center', margin: '3em 0em' }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'black',
            borderColor: 'white',
          },
          '& .Mui-selected': {
            color: 'black',
            borderColor: 'white',
            backgroundColor: '#2B5876',
          },
          '& .MuiPaginationItem-ellipsis': {
            color: 'black',
            backgroundColor: '#2B5876',
          },
          '& .MuiPaginationItem-icon': {
            color: '#2B5876',
          },
        }}
      />
    </Box>
  );
}
