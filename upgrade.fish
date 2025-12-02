#!/usr/bin/env fish

set ANGULAR_VERSION "^21.0.0"

pnpm --filter=angular-router-menus exec ng update --allow-dirty --force @angular/cli@$ANGULAR_VERSION
pnpm --filter=angular-router-menus exec ng update --allow-dirty --force @angular/core@$ANGULAR_VERSION

pnpm --filter=app exec ng update --allow-dirty --force @angular/cli@$ANGULAR_VERSION
pnpm --filter=app exec ng update --allow-dirty --force @angular/core@$ANGULAR_VERSION

set ts_version $(cat projects/angular-router-menus/node_modules/@angular/build/package.json | jq '.peerDependencies.typescript' | xargs)
pnpm add -Dw "typescript@$ts_version"

pnpm --filter=angular-router-menus add -D "typescript@$ts_version"
pnpm --filter=app add -D "typescript@$ts_version"

pnpm update -r
pnpm outdated -r
