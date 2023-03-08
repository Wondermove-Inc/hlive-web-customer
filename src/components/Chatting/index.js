import { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Box, Grid, Button, Card, CardContent, Typography, TextField, InputAdornment } from '@mui/material';
import moment from 'moment';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import icon_expand from '@images/icon_expand.png';
import icon_collapse from '@images/icon_collapse.png';

export default function LiveConsultChat() {
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const [newMessage, setNewMessage] = useState('');
  const [chattingList, setChattingList] = useState([
    { who: 'customer', message: 'hello, dealer' },
    {
      who: 'mine',
      message: 'Thank you for contact us! How can I help you?',
    },
    { who: 'customer', message: 'I would like to book a reservation' },
    {
      who: 'mine',
      message: 'Great! Please tell me when you are available.',
    },
    { who: 'customer', message: 'Sure. How about Friday at 13:00?' },
    {
      who: 'mine',
      message: 'Let me check.',
    },
    // { who: 'customer', message: 'hello, dealer' },
    // { who: 'mine', message: 'dealer chat here' },
    // { who: 'customer', message: 'customer chat here' },
    // { who: 'mine', message: 'dealer chat here' },
  ]);

  // useEffect(() => {
  //   scrollRef?.current?.scrollTo(0, scrollRef.current.scrollHeight);
  // }, [chattingList]);

  return (
    <>
      <div style={styles.container}>
        <Box style={styles.chatHeader}>
          <Typography style={styles.chatHeaderTitle}>{t('chat')}</Typography>

          <img src={icon_collapse} style={styles.chatHeaderIcon} alt="icon_collapse" />
        </Box>

        <div style={styles.chatContainer}>
          {chattingList.map((item, index) => {
            return (
              <div style={styles.chatBubbleWrapper} key={index}>
                <Box key={item.date} variant="contained" style={styles.chatBubble}>
                  <Typography style={styles.chatBubbleText}>{item.message}</Typography>
                </Box>
                <Box>
                  <Typography style={styles.chatBubbleDate}>{moment(item.date).format('ddd hh:mm A')}</Typography>
                </Box>
              </div>
            );
          })}
        </div>
        <TextField
          style={styles.chatInput}
          // fullWidth
          // multiline
          // rows={2}
          // variant="standard"
          // color="primary"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          autoComplete="off"
          placeholder={t('please_enter_a_chat')}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              // addMsg(newMsg);
              setNewMessage('');
            }
          }}
          // InputProps={{
          //   // disableUnderline: true,
          //   startAdornment: (
          //     <InputAdornment position="start">
          //       <Button sx={styles.attachButton} aria-label="attach" onClick={() => {}}>
          //         <AttachFileIcon />
          //       </Button>
          //     </InputAdornment>
          //   ),
          //   endAdornment: (
          //     <InputAdornment position="end">
          //       <Button
          //         style={styles.sendButton}
          //         aria-label="send"
          //         // variant="contained"
          //         // color={newMsg === "" ? "gray" : "primary"}
          //         disabled={newMessage === '' ? true : false}
          //         autoComplete="false"
          //         onClick={() => {
          //           setNewMessage('');
          //         }}
          //       >
          //         <ArrowUpwardIcon />
          //       </Button>
          //     </InputAdornment>
          //   ),
          // }}
        />
      </div>
    </>
  );
}
