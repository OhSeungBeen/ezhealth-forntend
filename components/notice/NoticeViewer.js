import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const PostViewer = ({ notice, error, loading }) => {
  const classes = useStyles();

  // error
  if (error) {
    if (error.response && error.response.status === 404) {
      console.log('aaa');
      return <h1 style={{ color: 'black' }}>존재하지 않는 포스터 입니다.</h1>;
    }
    return <h1 style={{ color: 'black' }}>오류 발생</h1>;
  }
  // loading || notice null
  if (loading || !notice) {
    return null;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Writer</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notice &&
              notice.map((notice) => (
                <TableRow key={notice.no}>
                  <TableCell component="th" scope="row">
                    {notice.no}
                  </TableCell>
                  <TableCell align="center">{notice.title}</TableCell>
                  <TableCell align="center">{notice.writer}</TableCell>
                  <TableCell align="center">{notice.date}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination />
    </>
  );
};

export default PostViewer;
