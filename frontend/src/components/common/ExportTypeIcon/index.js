import React from 'react';

import DocumentIcon from '@mui/icons-material/InsertDriveFileOutlined';
import TextIcon from '@mui/icons-material/TranslateOutlined';
import TableIcon from '@mui/icons-material/TableChartOutlined';

const ExportTypeIcon = ({ type, size }) => {

  return (
    <>
      { type == 'document' && <DocumentIcon sx={{ height: size, width: size }} /> }
      { type == 'text' && <TextIcon sx={{ height: size, width: size }} /> }
      { type == 'table' && <TableIcon sx={{ height: size, width: size }} /> }
    </>
  )
}

export default ExportTypeIcon;