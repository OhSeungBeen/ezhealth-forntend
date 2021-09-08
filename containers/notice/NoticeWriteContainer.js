import React, { useEffect, useCallback } from 'react';
import NoticeWrite from '../../components/notice/NoticeWrite';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/noticeWrite';

const NoticeWriteContainer = () => {
  const dispatch = useDispatch();
  const { title, content } = useSelector(({ noticeWrite }) => ({
    title: noticeWrite.title,
    content: noticeWrite.content,
    notice: noticeWrite.notice,
    noticeError: noticeWrite.noticeError,
  }));

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <NoticeWrite
      onChangeField={onChangeField}
      title={title}
      content={content}
    />
  );
};

export default NoticeWriteContainer;
