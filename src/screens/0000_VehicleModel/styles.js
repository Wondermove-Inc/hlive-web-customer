import { fonts, color } from '@theme';

export const styles = {
  categoryGridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    marginBottom: '40px',
  },
  modelGridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    // gap: '35px',
  },

  categoryName: {
    ...fonts.h2,
    color: color.grey_600,
    paddingTop: '40px',
  },

  modelBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '254px',
    height: '200px',
    // border: '1px solid',
  },

  modelImage: {
    width: '254px',
    height: '140px',
  },

  modelButton: {
    '&:hover': { transform: 'scale(1.05)' },
  },
};
