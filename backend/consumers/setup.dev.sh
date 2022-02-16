
# TODO: Add Tesseract installation (See dockerfile for inspiration)

echo ""
echo "Setting up Python development environment"

echo "  Checking for text service.."
if [ ! -d "build/text-service/text-service-env" ]
then
  echo "    Could not find text-service-env, creating one instead.."
  python3 -m venv build/text-service/text-service-env
  echo "export SERVICE=text" >> build/text-service/text-service-env/bin/activate
  source build/text-service/text-service-env/bin/activate
  python3 -m pip install --upgrade pip
  pip install --no-cache-dir -r build/text-service/requirements.txt
  pip install --no-cache-dir -r build/text-service/requirements.dev.txt
  echo "    Done."
else
  echo "  Found."
fi

echo ""
echo "  Checking for table service.."
if [ ! -d "build/table-service/table-service-env" ]
then
  echo "    Could not find table-service-env, creating one instead.."
  python3 -m venv build/table-service/table-service-env
  echo "export SERVICE=table" >> build/table-service/table-service-env/bin/activate
  source build/table-service/table-service-env/bin/activate
  python3 -m pip install --upgrade pip
  pip install --no-cache-dir -r build/table-service/requirements.txt
  pip install --no-cache-dir -r build/table-service/requirements.dev.txt
  echo "    Done."
else
  echo "  Found."
fi

echo ""
echo "  Checking for pdf service.."
if [ ! -d "build/pdf-service/pdf-service-env" ]
then
  echo "    Could not find pdf-service-env, creating one instead.."
  python3 -m venv build/pdf-service/pdf-service-env
  echo "export SERVICE=pdf" >> build/pdf-service/pdf-service-env/bin/activate
  source build/pdf-service/pdf-service-env/bin/activate
  python3 -m pip install --upgrade pip
  pip install --no-cache-dir -r build/pdf-service/requirements.txt
  pip install --no-cache-dir -r build/pdf-service/requirements.dev.txt
  echo "    Done."
else
  echo "  Found."
fi

echo ""
echo "WARNING: Tesseract is not installed as part of this script. Please install it manually!"
echo ""
