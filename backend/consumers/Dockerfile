FROM python:slim-buster

ARG SERVICE

# Install package dependancies
RUN apt-get update 
RUN apt-get install apt-transport-https
RUN apt-get install ffmpeg libsm6 libxext6  -y

# Update sources list
RUN   echo "deb https://notesalexp.org/tesseract-ocr-dev/buster/ buster main" >> /etc/apt/sources.list

# Fetch and install GnuPG ket
RUN apt-get -y --force-yes update -oAcquire::AllowInsecureRepositories=true
RUN apt-get -y --force-yes install notesalexp-keyring -oAcquire::AllowInsecureRepositories=true
RUN apt-get update

# Install tesseract library
RUN apt-get -y install tesseract-ocr

# Download last language package
RUN mkdir -p /usr/share/tessdata
ADD https://github.com/tesseract-ocr/tessdata_fast/blob/main/eng.traineddata?raw=true /usr/share/tessdata/ita.traineddata

# Check the installation status
RUN tesseract --list-langs    
RUN tesseract -v 

# Create microservice directory
WORKDIR /usr/src

# Upgrade pip
RUN /usr/local/bin/python -m pip install --upgrade pip

COPY build/${SERVICE}-service/requirements.txt .

COPY /src/server.py .
COPY /src/common .
COPY /src/services/${SERVICE}.py ./service.py

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5672

ENTRYPOINT [ "python", "server.py" ]