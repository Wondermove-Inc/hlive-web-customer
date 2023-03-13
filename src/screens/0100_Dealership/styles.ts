import { color, fonts, padding } from '@theme';

export const styles = {
  container: {
    display: 'flex',
    height: '600px',
    // position: 'relative',
  },

  searchFilterContainer: {
    position: 'relative',
    overflowY: 'auto',
    minWidth: '420px',
    background: color.primary_blue,
    display: 'flex',
    flexDirection: 'column',
    // padding: padding.padding_20,
  },

  mapContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    // display: 'flex',
    // justifyContents: 'center',
    // alignItems: 'center',
  },

  filterPopupButton: {
    color: color.grey_white,
  },

  filterPopup: {
    position: 'absolute',
    top: '90px',
    right: '20px',
    // transform: 'translate(-50%, -50%)',
    zIndex: 1,
    background: color.primary_blue,
    color: 'white',
    width: '210px',
    display: 'flex',
    flexDirection: 'column',

    padding: padding.padding_20,
    border: `1px solid ${color.grey_white_opacity_20}`,
    gap: '8px',
  },

  filterOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: color.grey_white,
  },

  checkBox: {
    padding: 0,
    borderRadius: 0,
    color: color.grey_white,
  },

  searchBar: {
    borderBottom: `1px solid ${color.grey_500}`,
    padding: '20px',

    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: `1px solid ${color.grey_500}`,
        borderRadius: 0,
      },
      '&:hover fieldset': {
        border: `1px solid ${color.grey_500}`,
      },
      '&.Mui-focused fieldset': {
        border: `1px solid ${color.grey_500}`,
      },
    },

    '& .MuiOutlinedInput-input': {
      color: color.grey_white,
    },

    '& ::placeholder': {
      ...fonts.b2_r,
      color: color.grey_white_opacity_40,
      fontSize: '14px',
    },
  },

  dealershipWrapper: {
    padding: '0 20px',
  },

  dealershipListBox: {
    height: '500px',
    // overflowY: 'auto',
  },

  dealershipListButton: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    borderRadius: 0,
    borderBottom: `1px solid ${color.grey_500}`,
    padding: '20px',
    color: color.grey_white,
    textTransform: 'none',

    '&:focus': {
      background: color.primary_hover_blue,
      // transform: 'scale(1.05)',
    },

    '&:hover': {
      background: color.primary_hover_blue,
      // transform: 'scale(1.05)',
    },
  },

  dealershipInfoText: {
    color: color.grey_white,
  },

  openInfoText: {
    ...fonts.b2_head_r,
    color: color.grey_500,
  },
};
