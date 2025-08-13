#!/usr/bin/env fish

# Get the latest Angular major version from the library's package.json
set ANGULAR_VERSION "^20.1.0"

echo "🚀 Starting Angular Router Menus upgrade process..."

# Update root workspace dependencies first
echo "📦 Updating root workspace dependencies..."
pnpm update --latest

# Update Angular CLI and core packages in library
echo "📦 Updating library Angular packages..."
cd projects/angular-router-menus/
pnpm ng update --allow-dirty --force @angular/cli@$ANGULAR_VERSION
pnpm ng update --allow-dirty --force @angular/core@$ANGULAR_VERSION

# Update Angular packages in the demo app
echo "📦 Updating app Angular packages..."
cd ../app/
pnpm ng update --allow-dirty --force @angular/cli@$ANGULAR_VERSION
pnpm ng update --allow-dirty --force @angular/core@$ANGULAR_VERSION

cd ../../

# Get TypeScript version requirement from Angular
echo "🔍 Detecting TypeScript version requirement..."
set ts_version $(cat projects/angular-router-menus/node_modules/@angular/build/package.json 2>/dev/null | jq -r '.peerDependencies.typescript' | sed 's/[<>= ]//g' | cut -d'.' -f1,2)

if test -n "$ts_version"
    echo "📦 Setting TypeScript to version ^$ts_version..."
    pnpm add -Dw "typescript@^$ts_version"
    cd projects/angular-router-menus/
    pnpm add -D "typescript@^$ts_version"
    cd ../app/
    pnpm add -D "typescript@^$ts_version"
    cd ../../
end

# Update all packages recursively
echo "📦 Updating all packages recursively..."
pnpm update -r

# Install to resolve peer dependencies
echo "📦 Installing dependencies..."
pnpm install

# Show outdated packages
echo "📋 Checking for outdated packages..."
pnpm outdated -r

# Ensure @types/node matches the version in .prototools
echo "🔧 Aligning @types/node with .prototools..."
set node_version $(cat .prototools | grep "node" | cut -d'"' -f2 | sed 's/[^0-9]//g')
if test -n "$node_version"
    pnpm add -Dw "@types/node@^$node_version"
end

echo "✅ Upgrade process completed!"
