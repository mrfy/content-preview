#!/bin/bash

set -e

# --- CONFIG ---
IMAGE_NAME="ghcr.io/mrfy/content-preview"
VERSION_FILE="version.yaml"
DOCKERFILE="docker/Dockerfile"
BRANCH="main"

# --- PARAM ---
echo "Select version bump:"
select opt in "patch" "minor" "major"; do
  case $opt in
    patch|minor|major)
      BUMP_TYPE=$opt
      break
      ;;
    *)
      echo "Invalid option"
      ;;
  esac
done

# --- CHECK CLEAN GIT ---
if [[ -n $(git status --porcelain) ]]; then
  echo "❌ Masz niezatwierdzone zmiany (git dirty). Commit/push najpierw."
  exit 1
fi

# --- READ VERSION ---
CURRENT_VERSION=$(grep 'version:' $VERSION_FILE | awk '{print $2}')

IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

# --- BUMP VERSION ---
case $BUMP_TYPE in
  patch)
    PATCH=$((PATCH+1))
    ;;
  minor)
    MINOR=$((MINOR+1))
    PATCH=0
    ;;
  major)
    MAJOR=$((MAJOR+1))
    MINOR=0
    PATCH=0
    ;;
  *)
    echo "❌ Unknown bump type: $BUMP_TYPE"
    exit 1
    ;;
esac

NEW_VERSION="$MAJOR.$MINOR.$PATCH"

echo "➡️  Version: $CURRENT_VERSION → $NEW_VERSION"

# --- SAVE VERSION ---
echo "version: $NEW_VERSION" > $VERSION_FILE

# --- COMMIT + TAG ---
git add $VERSION_FILE
git commit -m "release: v$NEW_VERSION"

git tag "v$NEW_VERSION"

# --- PUSH GIT ---
git push origin $BRANCH
git push origin "v$NEW_VERSION"

# --- BUILD IMAGE ---
docker build -f $DOCKERFILE \
  -t $IMAGE_NAME:$NEW_VERSION \
  -t $IMAGE_NAME:latest \
  .

# --- PUSH IMAGE ---
docker push $IMAGE_NAME:$NEW_VERSION
docker push $IMAGE_NAME:latest

echo "✅ Released version $NEW_VERSION"