import { color, fonts } from '@theme';

export const styles = {
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    background: color.secondary_active_red,
    padding: '5px 10px',
    borderRadius: '16px',
  },
  font: {
    ...fonts.b2_head_r,
    color: color.grey_white,
  },
};
