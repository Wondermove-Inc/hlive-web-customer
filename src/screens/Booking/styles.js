import { color, fonts, height, spacing, width } from '@theme';

export const styles = {
  subtitleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: spacing.spacing_7_desktop,
    marginBottom: spacing.spacing_9_desktop,
  },

  MainContainer: {
    width: width.width_80,
    marginBottom: spacing.spacing_13_desktop,
  },

  stepperWrapper: {
    width: '100%',
    height: height.stepper,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `2px solid ${color.grey_200}`,
  },

  stepperBox: {
    width: '80%',
  },

  step: {
    width: '25%',
    '& .MuiStepLabel-labelContainer': {
      paddingRight: '22px',
    },
    '& .MuiStepLabel-labelContainer span': {
      ...fonts.b1_head_m,
      color: color.grey_500,
    },
    '& .MuiStepLabel-root .Mui-completed': {
      color: color.primary_blue,
    },
    '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {
      color: color.grey_white,
    },
    '& .MuiStepLabel-root .Mui-active': {
      color: color.secondary_active_blue,
    },
    '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
      color: color.grey_white,
    },
    '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
      fill: color.grey_white,
    },
  },

  stepLabelBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  stepButton: {
    justifyContent: 'flex-start',
  },
  stepConnector: {
    width: '24px',
    height: '24px',
    color: color.grey_300,
  },

  stepScreenWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
};
