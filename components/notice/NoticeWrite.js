import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

import GridContainer from '../grid/GridContainer';
import GridItem from '../grid/GridItem';
import CustomInput from '../input/CustomInput';
import Button from '../buttons/Button';
// quill
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import 'react-quill/dist/quill.snow.css';

const NoticeWrite = ({ title, content, onChangeField }) => {
  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
          { align: [] },
        ],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      //handlers: { image: this.imageHandler },
    },
    //clipboard: { matchVisual: false },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'size',
    'color',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'align',
  ];

  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  const onChangeContent = (content, delta, source, editor) => {
    onChangeField({ key: 'content', value: editor.getHTML() });
  };

  return (
    <>
      <CustomInput
        id="regular"
        inputProps={{
          placeholder: 'Write a title',
        }}
        formControlProps={{
          fullWidth: true,
        }}
        onChange={onChangeTitle}
      />
      <QuillNoSSRWrapper
        theme="snow"
        placeholder={'Write your content.'}
        modules={modules}
        formats={formats}
        onChange={onChangeContent}
      />
      <GridContainer justify="flex-end" alignItems="flex-start">
        <GridItem>
          <Button type="button" color="primary">
            Write
          </Button>
          <Button type="button" color="danger">
            Cancel
          </Button>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default NoticeWrite;
