import { color, fonts, height, padding, width } from '@theme';

export const styles = {
  container: {
    display: 'flex',
    overflowY: 'auto',
    flexDirection: 'column',
    background: color.grey_white,
  },

  reservationHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: '40px',
    padding: '0 32px',
    paddingTop: '16px',
    borderBottom: `1px solid ${color.grey_300}`,
  },

  closeIcon: {
    width: width.icon_14,
    height: height.icon_14,
    borderRadius: 0,
    padding: 0,
  },

  contentsWrapper: {
    padding: '20px 32px 32px 32px',
  },

  infoBanner: {
    padding: '20px 0',
    background: color.secondary_light_sand,
    textAlign: 'center',
  },

  infoBannerText: {
    ...fonts.b2_head_r,
    color: color.grey_600,
  },

  contentsContainer: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: '1fr 1fr',
    // marginTop: '20px',
  },

  datePickerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },

  infoCardWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  infoCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },

  infoCardBox: {
    border: `1px solid ${color.grey_300}`,
    padding: padding.padding_20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  editButton: {
    ...fonts.link,
    textTransform: 'none',
    padding: 0,
  },

  modelCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },

  dealershipCard: { display: 'flex', gap: '20px' },

  personalInfoCard: { display: 'flex', flexDirection: 'column', gap: '4px' },

  mapInfo: {
    width: '120px',
    height: '100px',
    border: `1px solid ${color.grey_400}`,
  },

  dealershipInfo: { display: 'flex', flexDirection: 'column', gap: '4px' },

  cardInfoText: {
    ...fonts.b2_text_r,
    color: color.grey_600,
  },

  modelImage: { width: '208px', height: '112px' },

  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
  },
};
