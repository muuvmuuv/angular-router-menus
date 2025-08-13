#!/usr/bin/env fish

# Get the latest Angular major version from the library's package.json
set ANGULAR_VERSION "^20.1.0"

echo "🚀 Starting Angular Router Menus upgrade process..."

# Update Angular CLI and core packages in library using workspace commands
echo "📦 Updating library Angular packages..."
pnpm --filter=angular-router-menus exec ng update --allow-dirty --force @angular/cli@$ANGULAR_VERSION
pnpm --filter=angular-router-menus exec ng update --allow-dirty --force @angular/core@$ANGULAR_VERSION

# Update Angular packages in the demo app using workspace commands
echo "📦 Updating app Angular packages..."
pnpm --filter=app exec ng update --allow-dirty --force @angular/cli@$ANGULAR_VERSION
pnpm --filter=app exec ng update --allow-dirty --force @angular/core@$ANGULAR_VERSION

# Get TypeScript version requirement from Angular
echo "🔍 Detecting TypeScript version requirement..."
set ts_version $(cat projects/angular-router-menus/node_modules/@angular/build/package.json | jq '.peerDependencies.typescript' | xargs)

echo "📦 Setting TypeScript to version ^$ts_version..."
pnpm add -Dw "typescript@^$ts_version"
pnpm --filter=angular-router-menus add -D "typescript@^$ts_version"
pnpm --filter=app add -D "typescript@^$ts_version"

# Update all packages recursively
echo "📦 Updating all packages recursively..."
pnpm update -r

# Install to resolve peer dependencies
echo "📦 Installing dependencies..."
pnpm install

# Show outdated packages
echo "📋 Checking for outdated packages..."
pnpm outdated -r

echo "✅ Upgrade process completed!"
