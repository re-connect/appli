#!/bin/bash

. ./functions.sh

REFERENCE_FILE="../app.config.js"
FILES_TO_UPDATE=($REFERENCE_FILE "../app.json" "../android/app/build.gradle" "../ios/Reconnect/Info.plist")

CURRENT_BUILD_NUMBER=$(grep "buildNumber:" "$REFERENCE_FILE" | awk -F"'" '{print $2}')
NEXT_BUILD_NUMBER=$((CURRENT_BUILD_NUMBER + 1))

for FILE in "${FILES_TO_UPDATE[@]}"; do
    replace_in_file $CURRENT_BUILD_NUMBER $NEXT_BUILD_NUMBER $FILE
done

EXPECTED_GIT_DIFF="4 files changed, 7 insertions(+), 7 deletions(-)"

if git_diff_is_valid "$EXPECTED_GIT_DIFF" ; then
    echo "Bumped from ${CURRENT_BUILD_NUMBER} to ${NEXT_BUILD_NUMBER}"
else
    echo "\033[0;31mSomething went wrong during bump, please check your git diff.\033[0m"
fi
