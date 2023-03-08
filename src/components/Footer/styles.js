import { color, fonts, width } from '@theme';

export const styles = {
  disclaimerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: color.secondary_light_sand,
    padding: '60px 0',
  },

  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: color.grey_900,
    padding: '40px 0',
  },

  contentsContainer: {
    width: width.width_80,
  },

  footerLogo: {
    width: '58px',
    marginBottom: '24px',
  },

  footerCopyright: {
    ...fonts.b3_text_r,
    color: color.grey_700,
  },

  footerText: {
    ...fonts.b3_text_m,
    color: color.grey_700,
  },

  termText: {
    ...fonts.b1,
    color: color.grey_200,
  },

  disclaimerCopyright: {
    ...fonts.b1,
    color: color.grey_600,
  },

  footerDivider: {
    margin: '10px 0',
    borderColor: color.grey_300,
  },

  disclaimerDivider: {
    borderColor: color.grey_700,
    margin: '20px 0',
  },

  termDivider: {
    borderColor: color.grey_800,
    margin: '0 16px',
    height: '10px',
  },
};
