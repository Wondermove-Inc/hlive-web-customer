import { TextField } from '@mui/material';
import { styles } from './styles';
import { color, fonts, font_color } from '@theme';

export const StyledTextInput = ({ InputLabelProps, InputProps, ...props }) => {
  return (
    <TextField
      fullWidth
      // size="small"
      id="outlined-required"
      autoComplete="off"
      sx={styles.textField}
      InputLabelProps={{
        ...InputLabelProps,
        sx: {
          ...fonts.b2_head_r,
          color: font_color.grey_600,
          lineHeight: '23px',
          '&.Mui-focused': {
            color: font_color.primary_hover_blue,
          },
        },
      }}
      InputProps={{
        ...InputProps,

        // maxLength: 10,
        // minLength: 3,
      }}
      {...props}
      FormHelperTextProps={{
        sx: {
          ...fonts.b2_text_r,
          color: color.secondary_active_red,
          '&.MuiFormHelperText-root': {
            marginLeft: 0,
          },
        },
      }}
    />
  );
};
