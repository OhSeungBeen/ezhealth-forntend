import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { withRouter } from 'next/router';
import NoticeViewer from '../../components/notice/NoticeViewer';
import { readNoitce, unloadNotice } from '../../modules/notice';

const NoticeViewerContainer = () => {
  const router = useRouter();
  const { noticeId } = router.query;

  const dispatch = useDispatch();
  const { notice, error, loading } = useSelector(({ notice, loading }) => ({
    notice: notice.notice,
    error: notice.error,
    loading: loading['notice/READ_NOTICE'],
  }));

  useEffect(() => {
    dispatch(readNoitce(noticeId));
    return () => {
      dispatch(unloadNotice());
    };
  }, [dispatch, noticeId]);

  // function createData(no, title, writer, date) {
  //   return { no, title, writer, date };
  // }

  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

  return <NoticeViewer notice={notice} loading={loading} error={error} />;
};

export default withRouter(NoticeViewerContainer);
