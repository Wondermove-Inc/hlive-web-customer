import { color, fonts, font_color, icon_size } from '@theme';

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  subtitle: {
    ...fonts.h2,
    color: color.grey_white,
    textAlign: 'center',
  },

  modelImageBox: {
    margin: '24px 0',
  },

  modelImage: {
    width: '460px',
    height: '230px',
  },

  progressBarBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: color.grey_white,
    marginBottom: '12px',
  },

  progressBar: {
    backgroundColor: color.grey_white_opacity_20,
    '& .MuiLinearProgress-bar': {
      backgroundColor: color.secondary_active_blue,
    },
  },

  progressIcon: {
    width: icon_size.icon_24,
    height: icon_size.icon_24,
    marginRight: '4px',
  },

  remainingTime: {
    color: color.secondary_active_blue,
  },

  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '1120px',
  },

  footerWrapper: {
    background: color.grey_1000,
    border: `1px solid ${color.grey_1000}`,
    paddingTop: '30px',
    // paddingBottom: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '120px',
  },

  footerContainer: { display: 'flex', flexDirection: 'column', justifyContent: 'center' },

  footerText: {
    ...fonts.b3_text_r,
    color: color.grey_500,
  },

  textButton: {
    ...fonts.b2_head_r,
    color: font_color.secondary_active_blue,
    textTransform: 'none',
    gap: '4px',
  },
};
