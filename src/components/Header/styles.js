import { color, fonts, font_color, icon_size, padding } from '@theme';
import { styled } from '@mui/system';
import { ToggleButton } from '@mui/material';

export const StyledToggleButton = styled(ToggleButton)({
  ...fonts.b2_text_r,
  color: font_color.main,
  borderRadius: 0,
  border: `1px solid ${color.secondary_sand} !important`,

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
  headerContainer: {
    // width: '100%',
    // height: '83px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: color.grey_white,
    padding: padding.padding_20,
  },

  logoContainer: {
    // border: '1px solid black',
    display: 'flex',
    alignItems: 'center',
  },
  headerLogo: {
    // border: '1px solid',
    width: '164px',
  },
  headerDivider: {
    height: '15px',
    margin: '0 20px',
    borderColor: color.grey_500,
  },
  countrySelectBox: {
    // position: 'relative',
    display: 'flex',
    alignItems: 'center',
    color: color.grey_black,
    gap: '8px',
  },

  countrySelectButton: {
    padding: 0,
    color: color.grey_black,
  },

  countryOptions: {
    position: 'absolute',
    top: '70px',
    width: '120px',
    display: 'flex',
    flexDirection: 'column',
    background: color.grey_white,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },

  expandedIcon: {
    width: icon_size.icon_20,
    height: icon_size.icon_20,
  },

  countryOptionText: {
    ...fonts.b2_head_r,
    // padding: '8px 0',
    borderRadius: 0,
    borderBottom: `1px solid ${color.grey_200}`,
  },
};
