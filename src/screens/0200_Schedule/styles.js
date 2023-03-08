import { color, fonts, font_color } from '@theme';

export const styles = {
  requestBanner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: color.secondary_light_sand,
    padding: '40px 60px',
    marginBottom: '40px',
  },

  textButtonBox: {
    display: 'flex',
    alignItems: 'center',
  },

  textButton: {
    ...fonts.b1_head_r,
    color: font_color.primary_blue,
    textTransform: 'none',

    '&.MuiButton-text:hover': {
      background: 'none',
    },
  },

  contentsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '60px',
    gap: '20px',
  },

  schedulePicker: {
    display: 'flex',
    height: '400px',
    marginBottom: '60px',
    flexWrap: 'wrap',
  },

  calendarBox: {
    width: '550px',
    // width: '50%',
  },

  timeSelectBox: {
    width: '550px',
    height: '400px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },

  timeSelectTitle: {
    padding: '15px 0',
    textAlign: 'center',
  },

  timeButton: {
    height: '56px',
    // padding: '24px 36px',
    borderRadius: 0,
    border: `1px solid ${color.secondary_sand}`,
    color: color.grey_black,
  },

  timeInfoWrapper: {
    display: 'flex',
    gap: '20px',
  },

  timeInfoBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
};
