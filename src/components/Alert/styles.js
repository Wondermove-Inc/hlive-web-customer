import { color, fonts, icon_size } from '@theme';

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${color.grey_300}`,
    background: color.grey_white,
    width: '450px',
    padding: '28px',
  },
  buttonBox: {
    display: 'flex',
    gap: '8px',
  },

  contentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButtonBox: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  closeButton: {
    width: icon_size.icon_24,
    height: icon_size.icon_24,
    color: color.grey_black,
  },

  description: {
    ...fonts.b2_text_r,
    color: color.grey_600,
  },
};
