import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import Button from '@mui/material/Button';

import Queue from '../../components/TaskQueue';
import ExportTypesDialog from '../../components/ExportTypesDialog';

import { connect, publishOLD } from '../../services/rabbit.service';

import './style.css';

const HomePage = () => {

  const [queue, setQueue] = React.useState([]);
  const [file, setFile] = React.useState();
  const [exportTypesDialog, setExportTypesDialog] = React.useState(false);
 
  useEffect(() => {
    connect();
  }, []);

  const handleUploadClicked = (event) => {
    setFile(event.target.files[0]);
    setExportTypesDialog(true);
  };

  const handleSubmitClicked = async () => {
    publishOLD(file[0]);
  };

  const handleAddItem = (exportType) => {
    const item = file;
    item.uid = uuid();
    item.exportType = exportType;
    setQueue((prev) => [item, ...prev]);
  }

  return (
    <>
      <ExportTypesDialog 
        open={exportTypesDialog} 
        setOpen={setExportTypesDialog} 
        handleAddItem={handleAddItem}
      />
      <div className='uploadContainer'>
        <Button variant="contained" onChange={handleUploadClicked} component="label">      
          <input type="file" hidden />
          Upload
        </Button>
      </div>
      <div className='queueContainer'>
        <Queue 
          items={queue}
          setItems={setQueue}
        />
      </div>
      <div className='submitContainer'>
        <Button variant="contained" onClick={handleSubmitClicked} >      
          Submit
        </Button>
      </div>
    </>
  );
}

export default HomePage;