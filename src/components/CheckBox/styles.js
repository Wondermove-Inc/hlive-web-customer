import { color } from '@theme';

export const styles = {
  checkbox: {
    '&.MuiCheckbox-root': {
      padding: 0,
    },
  },
  checked: {
    width: '18px',
    height: '18px',
    border: `2.5px solid ${color.grey_300}`,
    color: color.primary_blue,
    padding: 0,
    margin: 0,
  },
  unChecked: {
    width: '18px',
    height: '18px',
    border: `2.5px solid ${color.grey_300}`,
    color: 'white',
    padding: 0,
    margin: 0,
  },
};
