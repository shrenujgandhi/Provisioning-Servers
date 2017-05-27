#!/bin/bash

clear
echo ""
sleep 1
echo " SERVER PROVISIONING STARTS NOW"
sleep 2
echo ""
echo " YOU ARE REQUIRED TO INSTALL NODE, NPM, PYTHON, and PIP"
sleep 3
echo ""
echo " INITIATING DIGITALOCEAN SERVER"
echo ""
sleep 3
echo " Make sure TOKEN is set as DIGI_TOKEN environment variable"
echo " Make sure SSH_KEY is set in DIGI_SSH_KEY environment variable"
echo ""
sleep 5
echo " Installing dev dependencies"
echo " npm install"
npm install
echo ""
echo " node digitalocean.js"
node digitalocean.js

sleep 5
echo ""
echo " INITIATING AWS SERVER"
echo ""
sleep 3
echo " Make sure aws_access_key is set as AWS_ACCESS_KEY environment variable"
echo " Make sure aws_secret_access_key is set as AWS_SECRET_ACCESS_KEY environment variable"
echo ""
sleep 5
echo " pip install boto3"
pip install boto3
echo ""
echo " python aws.py"
python aws.py
echo ""
echo " SCRIPT ENDS"