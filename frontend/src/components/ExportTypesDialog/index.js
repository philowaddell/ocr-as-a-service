import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import LargeIconButton from './LargeIconButton';

const ExportTypesDialog = ({ open, setOpen, handleAddItem }) => {

  const filetypes = ["document", "text", "table"];
  const [selectedType, setSelectedType] = React.useState('None');

  const handleClose = () => {
    setOpen(false);
    setSelectedType('None');
  }

  const handleConfirmClicked = () => {
    handleAddItem(selectedType)
    handleClose();
  };

  const handleCancelClicked = () => {
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Select your export type."}
        </DialogTitle>
        <DialogContent>
          {filetypes.map((type) =>
            <LargeIconButton 
              key={type}
              type={type} 
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCancelClicked}>Cancel</Button>
          <Button 
            variant="contained" 
            disabled={selectedType === 'None'} 
            onClick={handleConfirmClicked} 
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ExportTypesDialog;
