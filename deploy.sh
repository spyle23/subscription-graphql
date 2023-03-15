set -e

npm run build
npm run preview

cd dist

echo > .nojekyll

git init 
git checkout -B main

git add -A
git commit -m 'deploy'

cd ~ 