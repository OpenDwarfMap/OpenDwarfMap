#!/bin/sh

NODE_OPTIONS="--max-old-space-size=8192" node newXmlToJson.js /var/www/dfhack-export/legends-region*/*legends.xml

node server.js
