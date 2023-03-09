import { color, fonts } from '@theme';

export const styles = {
  bannerTitle: {
    ...fonts.h1,
    marginBottom: '14px',
  },

  contentsContainerWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  contentsContainer: {
    width: '620px',
    gap: '24px',
    marginTop: '60px',
    marginBottom: '120px',
  },

  confirmInfoCard: {
    marginBottom: '24px',
  },

  vehicleModelImage: {
    width: '280px',
    // right: '-70px',
  },

  infoTitleText: {
    ...fonts.b1_text_r,
    color: color.grey_600,
  },

  infoBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px',
  },

  infoDivider: {
    borderColor: color.grey_200,
    marginTop: '12px',
    marginBottom: '16px',
  },
};
