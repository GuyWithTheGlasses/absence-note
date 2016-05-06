#!/bin/bash

if [ -f ownerstartup.sh ]
  then ./ownerstartup.sh
  else node ./bin/www
fi
