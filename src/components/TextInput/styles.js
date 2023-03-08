import { color } from '@theme';

export const styles = {
  textField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderWidth: '2px',
        borderColor: color.grey_300,
        // borderColor: color.secondary_active_red,
        borderRadius: 0,
      },
      '&:hover fieldset': {
        borderColor: color.primary_hover_blue,
      },
      '&.Mui-focused fieldset': {
        borderColor: color.primary_blue,
      },

      '& input:invalid fieldset': {
        borderColor: color.secondary_active_red,
      },
    },
    '& .MuiOutlinedInput-root.Mui-disabled': {
      background: color.grey_100,
      '& fieldset': {
        border: `1px solid ${color.grey_100}`,
      },
    },
  },
};
