import { useState } from 'react';
import { AppBar, Toolbar, Box, Divider, IconButton, Typography } from '@mui/material/';
import image_logo_3x from '@images/image_logo_3x.png';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { styles } from './styles';
import { fonts } from '@theme';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();
  const countries = ['Italia', 'Spain', 'Netherland', 'France', 'Ireland'];

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar variant="dense" style={styles.headerContainer}>
        <div style={styles.logoContainer}>
          <IconButton disableRipple>
            <img src={image_logo_3x} style={styles.headerLogo} alt="image_logo" />
          </IconButton>
          <Divider orientation="vertical" variant="middle" style={styles.headerDivider} />
          <Typography style={fonts.s1}>{t('h_live')}</Typography>
        </div>

        <div style={styles.countrySelectBox}>
          <LanguageIcon />
          <IconButton onClick={handleClick} style={styles.countrySelectButton} disableRipple>
            <Typography style={fonts.b1_head_r}>{t('language')}</Typography>
            {isExpanded ? <ExpandLessIcon style={styles.expandedIcon} /> : <ExpandMoreIcon style={styles.expandedIcon} />}
          </IconButton>

          {isExpanded ? (
            <div style={styles.countryOptions}>
              {countries.map((country, index) => {
                return (
                  <IconButton key={index} style={styles.countryOptionText} disableTouchRipple>
                    <Typography>{country}</Typography>
                  </IconButton>
                );
              })}
            </div>
          ) : null}
        </div>
      </Toolbar>
    </AppBar>
  );
}
