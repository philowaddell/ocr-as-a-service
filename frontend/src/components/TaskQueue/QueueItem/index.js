import React from 'react';

import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import DeleteIcon from '@mui/icons-material/Delete';
import PlayIcon from '@mui/icons-material/PlayCircleOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import CircularProgress from '@mui/material/CircularProgress';

import OrbitalButton from './OrbitalButton';

import { publish, getBindingKey } from '../../../services/rabbit.service';
import { decode, save } from '../../../services/download.service';
import { encodeBase64String as encode} from '../../../services/upload.service';


const QueueItem = ({ handleRemoveItem, item }) => {

  const STATE = ['ready', 'processing', 'waiting', 'complete', 'error']
  const [download, setDownload] = React.useState(null);
  const [currentState, setCurrentState] = React.useState(STATE[0])

  const handlePlayClicked = async() => {
    setCurrentState(STATE[1]);
    try {
      const base64 = await encode(item);
      const body = { 
        'base64': base64 
      };
      const headers = { CONTENT_TYPE: item.type }
      const bindingKey = getBindingKey(item.exportType)
      const result = await publish(bindingKey, base64, headers);
      setCurrentState(STATE[3]);
      const blob = await decode(result, item.exportType);
      setDownload(blob);
    } catch(e) {
      // Show some error state
    }
  };

  const handleDownloadClicked = () => {
    save(download, 'myfile');
  };

  const PrimaryButton = () => {
    switch(currentState) {
      case STATE[0]:
        return (
          <IconButton
            edge="end"
            aria-label="play"
            title="Play"
            onClick={() => handlePlayClicked(item)}
          >
            <PlayIcon />
          </IconButton>
        );
      case STATE[1]:
        return (
            <CircularProgress size={24}/>
        );
      case STATE[3]:
        return (
          <IconButton
            edge="end"
            aria-label="play"
            title="Play"
            onClick={() => handleDownloadClicked()}
          >
            <DownloadIcon />
          </IconButton>
        );
      default:
        return 'foo';
    }
  }

  return (
    <ListItem>
      <OrbitalButton type={item.exportType} />
      <ListItemText primary={item.name} />
      <IconButton
        edge="end"
        aria-label="delete"
        title="Delete"
        onClick={() => handleRemoveItem(item)}
      >
        <DeleteIcon />
      </IconButton>
      {PrimaryButton()}
    </ListItem>
  )

}

export default QueueItem;