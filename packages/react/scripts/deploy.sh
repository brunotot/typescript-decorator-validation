VERSION="$1"

## "deploy:patch": "echo '\u001b[32m1/6\u001b[0m Cleaning cache...' && npm cache clean --force --silent && echo '\u001b[32m2/6\u001b[0m Installing dependencies...' && npm i --force --silent && echo '\u001b[32m3/6\u001b[0m Running build script...' && npm run build && echo '\u001b[32m4/6\u001b[0m Bumping version to PATCH...' && npm version patch --force --silent && echo '\u001b[32m5/6\u001b[0m Publishing package...' && npm publish --access=public --silent && echo '\u001b[32m6/6\u001b[0m Pushing changes...' && git add . && git commit -m 'bump react patch version' && git push",

echo "\u001b[32m1/6\u001b[0m Cleaning cache..."
npm cache clean --force --silent

echo "\u001b[32m2/6\u001b[0m Installing dependencies..."
npm i --force --silent

echo "\u001b[32m3/6\u001b[0m Running build script..."
npm run build

echo "\u001b[32m4/6\u001b[0m Bumping version to $VERSION..."
npm version $VERSION --force --silent

echo "\u001b[32m5/6\u001b[0m Publishing package..."
npm publish --access=public --silent

echo "\u001b[32m6/6\u001b[0m Pushing changes..."
git add .
git commit -m "bump react $VERSION version"
git push
