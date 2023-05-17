# (*) create .gitignore: node, backup, jetbrains, kate, linux, sublime text, windows, macos + build, .env

# touch .env
# add .env to .gitignore
# add values to .env

source ./.env
#echo "GIT_USER_NAME: $GIT_USER_NAME"
#echo "GIT_USER_EMAIL: $GIT_USER_EMAIL"

git init
git config --local user.name "$GIT_USER_NAME"
git config --local user.email "$GIT_USER_EMAIL"
#git config --list --local

ssh-add -D && ssh-add "$GITHUB_KEY_PATH"

# add remote repository
# see: https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories
# git remote add origin git@github.com:<user>/<repo>.git
# git push --set-upstream origin master
# git push --set-upstream origin main
