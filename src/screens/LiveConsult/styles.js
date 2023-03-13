import { color, fonts, font_color, icon_size } from '@theme';

export const styledButton = {
  ...fonts.b2_text_r,
  color: font_color.main,
  borderRadius: 0,
  height: '40px',
  '&.MuiButton-outlinedPrimary': {
    border: 'red',
  },
};

export const styles = {
  container: {
    // position: 'relative',
    width: '100wh',
    height: '100vh',
    background: color.grey_1000,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  headerWrapper: {
    padding: '16px 20px',
  },

  headerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
  },

  headerLogoBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },

  headerDivider: {
    border: `0.5px solid ${color.grey_800}`,
  },

  headerTitle: {
    ...fonts.s1,
    color: font_color.grey_white,
  },

  dealershipInfoBox: {
    display: 'flex',
    alignItems: 'center',
    height: '60px',
    color: color.grey_white,
    gap: '12px',
  },

  dealerAvatar: {
    width: icon_size.icon_36,
    height: icon_size.icon_36,
    background: color.grey_white,
    borderRadius: '50%',
  },

  consultantName: {
    ...fonts.b1_head_m,
    color: color.grey_white,
  },

  dealershipName: {
    ...fonts.b3_text_r,
    color: color.grey_400,
  },

  closeButton: {
    width: icon_size.icon_16,
    height: icon_size.icon_16,
    color: color.grey_white,
  },

  contentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  subtitle: {
    ...fonts.h2,
    color: color.grey_white,
    textAlign: 'center',
    marginBottom: '42px',
  },

  vehicleModelBox: {
    position: 'relative',
    width: '460px',
    height: '230px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  modelImage: {
    width: '500px',
    zIndex: 1,
    position: 'absolute',
    bottom: '-20px',
    left: '0px',
  },

  emptyModelImage: {
    width: '350px',
    zIndex: 1,
    position: 'absolute',
    // bottom: '-20px',
    // left: '0px',
  },

  lottieImage: {
    position: 'absolute',
    bottom: 0,
  },

  progressBarBox: {
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  remainingTimeCount: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: color.grey_white,
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

  warningIcon: {
    width: icon_size.icon_24,
    height: icon_size.icon_24,
    marginRight: '4px',
    color: color.secondary_active_red,
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
    width: '100%',
    background: color.grey_1000,
    // border: `1px solid ${color.grey_300}`,
    paddingTop: '30px',
    paddingBottom: '60px',
    // position: 'absolute',
    bottom: 0,
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
  },

  footerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

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
