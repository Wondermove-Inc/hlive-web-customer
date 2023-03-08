import { color, height } from '@theme';

const styles = {
  bannerBox: {
    width: '100%',
    height: height.banner,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    background: color.secondary_light_sand,
  },
};

export default function Banner({ children }) {
  return <div style={styles.bannerBox}>{children}</div>;
}
