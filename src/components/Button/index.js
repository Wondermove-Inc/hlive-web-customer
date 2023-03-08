import { Button } from '@mui/material';
import { color, fonts, font_color } from '@theme';
import { styled } from '@mui/system';

export const MainButton = styled(Button)({
  // default
  ...fonts.cta1,
  borderRadius: 0,
  textTransform: 'none',
  boxShadow: 'none',

  // size
  '&.MuiButton-sizeSmall': {
    minWidth: '140px',
    height: '50px',
    padding: '15px 50px',
  },
  '&.MuiButton-sizeLarge': {
    width: '375px',
    height: '60px',
    padding: '20px 50px',
  },

  // contained
  '&.MuiButton-contained': {
    boxShadow: 'none',
  },

  '&.MuiButton-containedPrimary': {
    color: font_color.grey_white,
    background: color.primary_blue,
    border: `1px solid ${color.primary_blue}`,
  },

  '&.MuiButton-containedPrimary:hover': {
    color: font_color.grey_white,
    background: color.primary_hover_blue,
    border: `1px solid ${color.primary_hover_blue}`,
  },

  '&.MuiButton-containedSecondary': {
    color: font_color.primary_blue,
    background: color.grey_white,
    border: `1px solid ${color.grey_white}`,
  },

  '&.MuiButton-containedSecondary:hover': {
    color: font_color.main,
    background: color.grey_200,
    border: `1px solid ${color.grey_200}`,
  },

  // outlined
  '&.MuiButton-outlinedPrimary': {
    color: font_color.primary_blue,
    border: `2px solid ${color.primary_blue}`,
  },

  '&.MuiButton-outlinedPrimary:hover': {
    color: font_color.grey_white,
    background: color.primary_hover_blue,
    border: `2px solid ${color.primary_hover_blue}`,
  },

  '&.MuiButton-outlinedSecondary': {
    color: font_color.grey_white,
    border: `2px solid ${color.grey_white}`,
  },

  '&.MuiButton-outlinedSecondary:hover': {
    color: font_color.grey_black,
    background: color.grey_200,
    border: `2px solid ${color.grey_200}`,
  },

  // disabled
  '&.MuiButton-containedPrimary:disabled': {
    color: font_color.grey_600,
    background: color.grey_300,
    border: `1px solid ${color.grey_300}`,
  },

  '&.MuiButton-outlinedPrimary:disabled': {
    color: font_color.grey_400,
    border: `2px solid ${color.grey_400}`,
  },

  '&.MuiButton-containedSecondary:disabled': {
    color: font_color.grey_600,
    background: color.grey_900,
    border: `1px solid ${color.grey_900}`,
  },

  '&.MuiButton-outlinedSecondary:disabled': {
    color: font_color.grey_600,
    border: `2px solid ${color.grey_900}`,
  },
});
