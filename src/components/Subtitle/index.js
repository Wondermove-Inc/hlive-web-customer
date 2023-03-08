import { fonts, spacing } from '@theme';

const styles = {
  subtitleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: spacing.spacing_11_desktop,
    marginBottom: spacing.spacing_9_desktop,
  },
};

export default function Subtitle({ title }) {
  return (
    <div style={styles.subtitleWrapper}>
      <span style={fonts.h2}>{title}</span>
    </div>
  );
}
