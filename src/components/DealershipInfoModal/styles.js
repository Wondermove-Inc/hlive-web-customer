import { color } from '@theme';

export const styles = {
  cardContainer: {
    position: 'absolute',
    top: '80px',
    width: '370px',
    // zIndex: 1,
    left: `calc(50% - 185px)`,
    display: 'flex',
    flexDirection: 'column',
    background: color.grey_white,
    padding: '20px',
    gap: '20px',
  },

  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: color.grey_black,
  },

  contentsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    color: color.primary_blue,
  },

  contentsBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  cardButton: {
    display: 'flex',
    justifyContent: 'center',
  },
};
