replace_in_file() {
    local ACTUAL="$1"
    local NEW="$2"
    local FILE="$3"

    if [ -f "$FILE" ]; then
        if grep -q "$ACTUAL" "$FILE"; then
            sed -i '' "s/$ACTUAL/$NEW/g" "$FILE"
        fi
    fi
}

git_diff_is_valid() {
    local EXPECTED_GIT_DIFF="$1"

    if git diff --shortstat | grep -q "$EXPECTED_GIT_DIFF"; then
        return 0
    else
        return 1
    fi
}

check_platform_parameter() {
  if [ "$#" -ne 1 ]; then
    echo "Error: $0 [ios|android]"
    exit 1
  fi

  local PLATFORM="$1"

  case $PLATFORM in
    ios)
      echo "Prepare credentials for IOS"
      ;;
    android)
      echo "Prepare credentials for Android"
      ;;
    *)
      echo "Error : script only accepts 'ios' or 'android'."
      exit 1
      ;;
  esac
}
