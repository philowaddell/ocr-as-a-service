import cv2
import pytesseract
import numpy as np

from PIL import Image
from base64 import b64decode, b64encode
from io import BytesIO

def process_image(body):
  
  # Decode image from base64 uri
  data_uri = body.decode()
  header, encoded = data_uri.split(",", 1)
  im = Image.open(BytesIO(b64decode(encoded)))

  # Perform text extraction
  binary = pytesseract.image_to_pdf_or_hocr(im, lang='eng', extension='pdf', config='--psm 6')

  #Converting it in a excel-file
  data = b64encode(binary)
  
  return data