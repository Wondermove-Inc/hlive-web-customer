import { Checkbox, FormControl } from '@mui/material';
import { styles } from './styles';
import CheckIcon from '@mui/icons-material/Check';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export default function MainCheckBox({ onChange, checked }) {
  const label = { inputProps: { 'aria-label': 'Nofitication' } };
  return (
    <Checkbox
      sx={styles.checkbox}
      icon={<CheckBoxOutlineBlankIcon sx={styles.unChecked} />}
      checkedIcon={<CheckIcon sx={styles.checked} />}
      disableRipple
      {...label}
      onChange={onChange}
      checked={checked}
    />
  );
}
