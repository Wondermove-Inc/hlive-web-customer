import { fonts, color } from '@theme';

export const styles = {
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20px',
  },

  radioButton: {
    '&.MuiRadio-root.Mui-checked': {
      color: color.primary_blue,
    },
  },

  checkBoxContainer: {
    marginTop: '25px',
    marginBottom: '60px',
  },

  contentsBox: {
    display: 'flex',
    alignItems: 'flex-start',

    gap: '8px',
    marginTop: '16px',
  },

  privacyStatWrapper: {
    marginBottom: '32px',
  },

  privacyStatText: {
    ...fonts.b1_text_r,
    color: color.grey_700,
  },

  methodWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '16px',
    gap: '12px',
  },

  methodBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  mandatoryField: {
    ...fonts.b2_text_r,
    color: color.grey_700,
    textAlign: 'right',
    marginTop: '12px',
  },

  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
  },
};
