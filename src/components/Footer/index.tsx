import { Box, Divider, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import image_logo_white from '@images/image_logo_white.png';
import { styles } from './styles';

export default function Footer() {
  const { t } = useTranslation();
  const terms = [t('imprint'), t('privacy_policy'), t('disclaimer'), t('cookie')];
  return (
    <div>
      <div style={styles.disclaimerContainer}>
        <Box style={styles.contentsContainer}>
          <Typography style={styles.footerCopyright}>{t('copyright_hyundai_motor')}</Typography>
          <Divider style={styles.footerDivider} />
          <Typography style={styles.footerText}>{t('the_information_on_this_site_relating_to_hyundai_motor_company')}</Typography>
        </Box>
      </div>

      <div style={styles.footerContainer}>
        <Box style={styles.contentsContainer}>
          <IconButton edge="start" disableRipple>
            <img src={image_logo_white} style={styles.footerLogo} alt={t('hyundai')} />
          </IconButton>

          <Box style={{ display: 'flex' }}>
            {terms.map((word, index) => {
              return (
                <Box style={{ display: 'flex' }} key={word}>
                  <Typography style={styles.termText}>{word}</Typography>
                  {index < 3 ? <Divider orientation="vertical" variant="middle" style={styles.termDivider} /> : null}
                </Box>
              );
            })}
          </Box>

          <Divider style={styles.disclaimerDivider} />
          <Typography style={styles.disclaimerCopyright}>{t('copyright_2023_hyundai_motor_company_all_rights_reserved')}</Typography>
        </Box>
      </div>
    </div>
  );
}
