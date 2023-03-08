import { color, fonts, font_color, icon_size, width } from '@theme';

export const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    background: color.secondary_light_sand,
    width: '360px',
    height: '100%',
  },

  chatHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 20px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    background: color.secondary_light_sand,
    borderBottom: `1px solid ${color.grey_300}`,
  },

  chatHeaderTitle: {
    ...fonts.h3_head_m,
    color: color.primary_blue,
  },

  chatHeaderIcon: {
    cursor: 'pointer',
    color: color.primary_blue,
    width: icon_size.icon_32,
    height: icon_size.icon_32,
  },

  chatContainer: {
    // display: 'flex',
    // flexDirection: 'column',
    padding: '0 20px',
    overflowY: 'auto',
  },

  chatBubbleWrapper: {
    // border: '1px solid',
    display: 'flex',
    flexDirection: 'column',
    alignItems: `${(props) => (props.who === 'customer' ? 'flex-end' : 'flex-start')}`,
    margin: '8px 0',
    gap: '4px',
  },

  chatBubble: {
    background: color.grey_white,
    borderRadius: '10px',
    padding: '8px 12px',
  },

  chatBubbleText: {
    ...fonts.b2_head_r,
    color: font_color.main,
  },

  chatBubbleDate: {
    ...fonts.label,
    color: color.grey_600,
  },

  attachButton: {
    border: '1px solid',
    padding: 0,
    paddingLeft: 0,
  },

  sendButton: {
    background: color.grey_100,
    borderRadius: '50%',
    padding: 0,
  },

  chatInput: {
    width: '100%',
    bottom: 0,
    position: 'absolute',
    background: 'white',
    boxShadow: '0px -2px 2px rgba(0, 0, 0, 0.05)',

    //   '& .MuiTextField-root': {
    //     flex: 1,
    //   },
    //   '& .MuiInput-root': {
    //     // border: 1,
    //     // borderColor: "red",
    //     // borderRadius: 36,
    //   },

    //   '& .MuiInputBase-adornedStart': {
    //     // alignItems: "flex-end",
    //     // paddingLeft: 3,
    //   },
    //   '& .MuiInputBase-adornedEnd': {
    //     // alignItems: "flex-end",
    //     // paddingRight: 3,
    //   },
    //   '& >.chatInput': {
    //     flex: 1,
    //   },
    //   '& .input-root': {
    //     border: 1,
    //   },
    //   '&. MuiInput-root': {
    //     borderBottom: 0,
    //   },
  },

  //   inputButton: {
  //     border: 1,
  //     // width: 40,
  //     // height: 40,
  //     minWidth: 'unset',
  //     padding: 1,
  //     borderRadius: '100%',
  //     boxShadow: 'none',
  //     '& .MuiButtonBase .Mui-disabled': {
  //       background: 'red',
  //     },
  //   },
};
