import { IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MainButton } from '../Button';
import CloseIcon from '@mui/icons-material/Close';
import { styles } from './styles';
import { fonts } from '@theme';

export default function AlertPopup() {
  const { t } = useTranslation();
  return (
    <div style={styles.container}>
      <div style={styles.closeButtonBox}>
        <IconButton>
          <CloseIcon style={styles.closeButton} />
        </IconButton>
      </div>

      <div style={styles.contentsContainer}>
        <div>
          <Typography style={fonts.s1}>Question</Typography>
          <Typography style={styles.description}>Description</Typography>
        </div>
        <div style={styles.buttonBox}>
          <MainButton variant="contained" color="primary" size="small">
            Retry
          </MainButton>
          <MainButton variant="outlined" color="primary" size="small">
            Close
          </MainButton>
        </div>
      </div>
    </div>
  );
}
