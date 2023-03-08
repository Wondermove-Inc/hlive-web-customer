import { color, fonts, font_color } from '@theme';

export const styles = {
  container: {
    width: '100%',
    border: `2px solid ${color.grey_300}`,
  },

  address: {
    display: 'flex',
    alignItems: 'center',
    padding: '18px 12px ',
    // background: color.secondary_light_sand,
  },

  addressText: {
    ...fonts.b2_head_r,
    color: font_color.main,
  },
};
