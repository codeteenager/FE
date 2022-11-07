#!/usr/bin/env sh

set -e

npm run build

cd docs/.vitepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'update docs'

git push -f git@github.com:codeteenager/interview.git main:gh-pages

cd -