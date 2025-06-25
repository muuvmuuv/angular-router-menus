#!/usr/bin/env fish

set ANGULAR_VERSION "^20.0.0"

cd projects/angular-router-menus/
pnpm ng update --allow-dirty --force @angular/cli@$ANGULAR_VERSION

cd ../app/
pnpm ng update --allow-dirty --force @angular/cli@$ANGULAR_VERSION
pnpm ng update --allow-dirty --force @angular/core@$ANGULAR_VERSION

cd ../../

set ts_version $(cat projects/angular-router-menus/node_modules/@angular/build/package.json | jq '.peerDependencies.typescript' | xargs)
pnpm update -r "typescript@$ts_version"

pnpm update -r
pnpm outdated -r
