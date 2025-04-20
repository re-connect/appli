#!/bin/bash

. ./functions.sh

PLATFORM="$1"
check_platform_parameter $PLATFORM

cp ../credentials.prod.json ../credentials.json

if [ "$PLATFORM" == "ios" ]; then
    echo "Update project.pbxproj file for IOS deployment"

    FILE="../ios/Reconnect.xcodeproj/project.pbxproj"
    PREPROD_BUNDLE_ID="com.reconnect.CloudSolidaire.preprod"
    PROD_BUNDLE_ID="com.reconnect.CloudSolidaire.prod"
    replace_in_file $PREPROD_BUNDLE_ID $PROD_BUNDLE_ID $FILE

    EXPECTED_GIT_DIFF="2 file changed, 12 insertions(+), 12 deletions(-)"
else
    EXPECTED_GIT_DIFF="1 file changed, 10 insertions(+), 10 deletions(-)"
fi

if git_diff_is_valid "$EXPECTED_GIT_DIFF" ; then
    echo "Credentials successfully updated for production"
else
    echo "\033[0;31mSomething went wrong during credentials update, please check your git diff.\033[0m"
fi
