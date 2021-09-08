import { container } from 'styles/jss/nextjs-material-kit.js';

const noticeStyle = {
  container: {
    ...container,
    zIndex: '2',
    position: 'relative',
    paddingTop: '20vh',
    //color: '#FFFFFF',
    paddingBottom: '200px',
  },
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3',
  },
  mainRaised: {
    margin: '-60px 30px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    '@media (max-width: 830px)': {
      marginLeft: '10px',
      marginRight: '10px',
    },
  },
};

export default noticeStyle;
