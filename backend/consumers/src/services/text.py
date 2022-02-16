import cv2
import pytesseract
import numpy as np

from PIL import Image
from base64 import b64decode
from io import BytesIO

# TODO: Return string as b64 encoded binary

def process_image(body):
  
  # Decode image from base64 uri
  data_uri = body.decode()
  header, encoded = data_uri.split(",", 1)
  im = Image.open(BytesIO(b64decode(encoded)))
  grayscale = np.asarray(im.convert('L'))

  # Grayscale, Gaussian blur, Otsu's threshold
  blur = cv2.GaussianBlur(grayscale, (3,3), 0)
  thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

  # Morph open to remove noise and invert image
  kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3,3))
  opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations=1)
  invert = 255 - opening

  # Perform text extraction
  data = pytesseract.image_to_string(invert, lang='eng', config='--psm 6')
  return data