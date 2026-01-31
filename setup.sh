#!/bin/bash

echo "Compiling contracts..."
cd contract || exit
npx truffle compile

echo "📜 Migrating contracts..."
npx truffle migrate --reset

echo "🔑 Extracting contract address..."
cd ..
node scripts/extractAddress.js

echo "⚛️ Starting React app..."
npm run dev
