import { saveAs } from 'file-saver';

const decode = (uint8array, type) => {
  let base64;
  switch(type) {
    case 'text':
      return new Blob(Array.from(new TextDecoder("utf-8").decode(uint8array)), { type: "text/plain;charset=utf-8" });
    case 'table':
      base64 = new TextDecoder("utf-8").decode(uint8array);
      return b64toBlob(base64, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    case 'document':
      base64 = new TextDecoder("utf-8").decode(uint8array);
      return b64toBlob(base64, 'application/pdf');
    default:
      return null;
  }
};

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

const getExtension = (blobType) => {
  switch(blobType) {
    case 'text/plain;charset=utf-8':
      return '.txt';
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return '.xlsx';
    case 'application/pdf':
      return '.pdf';
    default:
      return '';
  }
}

const save = (blob, filename) => {
  const extension = getExtension(blob.type);
  saveAs(blob, filename + extension);
};

export { decode, save };