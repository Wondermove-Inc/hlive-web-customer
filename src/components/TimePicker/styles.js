import { ToggleButton } from '@mui/material';
import { color, fonts, font_color, icon_size } from '@theme';
import { styled } from '@mui/system';

export const TimeToggleButton = styled(ToggleButton)({
  ...fonts.b2_text_r,
  color: font_color.main,
  borderRadius: 0,
  border: `1px solid ${color.secondary_sand} !important`,
  height: '50px',
  background: `${(props) => (props.$preferred ? color.grey_white : color.secondary_sand)}`,

  '&.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
    marginLeft: 0,
  },

  '&.Mui-selected, &.Mui-selected:hover': {
    background: color.secondary_active_blue,
    border: `1px solid ${color.secondary_active_blue} !important`,
    color: color.grey_white,
  },

  '&.Mui-disabled, &.Mui-disabled:hover': {
    background: color.grey_200,
    border: `1px solid ${color.grey_200} !important`,
    color: color.grey_700,
  },
});

export const styles = {
  selectTimeBox: {
    width: '100%',
    // overflowY: 'auto',
    // border: '1px solid',
  },

  selectTimeTitle: {
    padding: '15px 0',
    textAlign: 'center',
  },

  timeButtonWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '12px',
    // alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
  },

  timeOptionText: {
    color: font_color.main,
    '&.Mui-selected': {
      color: font_color.grey_white,
    },
    '&.Mui-disabled': {
      color: font_color.grey_700,
    },
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

  recommededTimeIcon: {
    width: icon_size.icon_16,
    height: icon_size.icon_16,
    border: `1px solid ${color.secondary_sand}`,
    // background: color.grey_white,
    background: `${(props) => (props.recommended ? null : color.secondary_sand)}`,
  },
  alternativeTimeIcon: {
    width: icon_size.icon_16,
    height: icon_size.icon_16,
    border: `1px solid ${color.secondary_sand}`,
    background: color.secondary_sand,
  },
};
