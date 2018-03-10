#!/bin/bash

echo "Installing necessary NPM dependencies..."
echo "NOTE: If you face Permission Denied errors, you might have to run this script with sudo."
echo "----------------------------------------------------------------------------------------"

npm install -g ganache-cli solium
npm install --save solc web3 readline-sync

echo "----------------------------------------"
echo "Setting up Solium configuration files..."
echo "----------------------------------------"
solium --init

echo "All good!"
