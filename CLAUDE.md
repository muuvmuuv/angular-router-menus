# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm serve` - Run the demo application with hot reload
- `pnpm build` - Build the angular-router-menus library  
- `pnpm watch` - Build the library in watch mode

### Release Process
To release the library to npm:
1. `pnpm --filter=angular-router-menus release` - This will:
   - Build the library with `ng build` 
   - Navigate to the `dist/` folder (the built output)
   - Publish from the dist folder using `npm publish`

**Important:** The library must be published from the `dist/` folder, not the project root, because:
- Angular builds create the proper package.json with correct entry points
- The dist folder contains the compiled library code that consumers need
- The source project folder contains development files not meant for npm

### Workspace Commands
Use pnpm workspace filtering to run commands in specific projects:
- `pnpm --filter=angular-router-menus <command>` - Run command in library project
- `pnpm --filter=app <command>` - Run command in demo app project
- `pnpm --filter=angular-router-menus build` - Build only the library
- `pnpm --filter=app build` - Build only the demo app
- `pnpm --filter=angular-router-menus exec ng <command>` - Run Angular CLI in library
- `pnpm --filter=app exec ng <command>` - Run Angular CLI in demo app

### Code Quality
- `pnpm lint` - Run Biome linter to check code quality
- `pnpm format` - Format code and apply fixes with Biome

### Upgrade Workflow
- `./upgrade.fish` - Automated dependency upgrade script that:
  1. Updates root workspace dependencies
  2. Updates Angular packages in both library and app
  3. Automatically detects and sets correct TypeScript version
  4. Installs all dependencies and resolves peer dependencies
  5. Shows remaining outdated packages

## Architecture

This is a monorepo using pnpm workspaces with two main projects:

### `/projects/angular-router-menus` - Core Library
The library automatically generates navigation menus from Angular route configurations. It provides a zero-dependency solution for building type-safe, dynamic menus.

#### Core Files:
- **public-api.ts**: Main entry point exporting all public APIs
- **provider.ts**: `provideRouterMenus()` function that bootstraps the menu system
  - Takes routes array, menu names array, and options
  - Uses Angular's APP_INITIALIZER to build menus asynchronously
  - Handles errors silently unless debug mode is enabled
- **service.ts**: `RouterMenusService` singleton that stores menu state
  - Uses Angular signals for reactive menu updates
  - Methods: `add()` to register menus, `use()` to retrieve menu signals
- **builder.ts**: Core menu building logic with 4 main steps:
  1. `resolveLazyLoadedChildren()` - Resolves all lazy routes using Angular's internal RouterPreloader
  2. `filterRoutesWithMenu()` - Recursively filters routes that have menu properties
  3. `convertRoutesToMenuItems()` - Transforms routes into MenuItem objects with normalized paths
  4. `buildMenu()` - Groups items by menu name and applies sorting
- **menu.ts**: TypeScript interfaces and Angular Route augmentation
  - Extends Route interface with optional `menu` property
  - Defines MenuItem interface with label, href, priority, icon support
- **options.ts**: Configuration interfaces for menu behavior
- **helper.ts**: Utility functions (path normalization, sleep)

#### Type System:
The library uses ambient type declarations that consumers override:
- `Menus` - Union type of menu names (default: string)
- `MenuItemIcon` - Icon type (default: string) 
- `MenuItemIconPosition` - Icon position (default: string)

### `/projects/app` - Demo Application  
Example Angular app demonstrating library usage with:
- Multiple menus ("main" and "aside")
- FontAwesome icon integration via type overrides
- Tailwind CSS styling
- Zoneless change detection
- Standalone components

## Key Implementation Details

1. **Route Processing Flow**:
   - Routes with `menu` property are collected recursively
   - Lazy routes are resolved using Angular's internal `RouterConfigLoader`
   - Paths are normalized and concatenated from parent routes
   - Menu items inherit route titles if no label specified

2. **Menu Item Properties**:
   - `in`: Which menu to appear in (defaults to defaultMenu option)
   - `priority`: Sort order within menu (default: 0)
   - `label`: Display text (defaults to route.title)
   - `href`: Navigation path (can be overridden for external links)
   - `icon`: Optional icon with name and position

3. **Initialization Strategy**:
   - Menus are registered synchronously during app initialization
   - Building happens asynchronously (100ms delay) to avoid blocking
   - Requires a RouterPreloader strategy (e.g., NoPreloading)

4. **Error Handling**:
   - Internal API usage errors are caught and suppressed
   - Enable debug mode to see errors in console
   - Menu service throws if accessing non-existent menus

## Upgrade Process

When upgrading dependencies:

1. **Use the upgrade script**: Run `./upgrade.fish` for automated upgrades
2. **Manual process** (if needed):
   - Check outdated packages: `pnpm outdated -r`
   - Update Angular packages while maintaining version compatibility
   - Use workspace filters instead of cd: `pnpm --filter=<project> <command>`
   - Ensure TypeScript version matches Angular requirements (usually 5.8.x for Angular 20)
   - Update peer dependencies in library package.json if needed
3. **Test builds**: Always test both `pnpm build` (library) and `pnpm --filter=app build` (app) 
4. **Fix peer dependency mismatches**: Add missing Angular packages to dependencies if needed
5. **Run linting**: Use `pnpm lint` and `pnpm format` to check and fix issues

Common issues:
- TypeScript version conflicts: Angular 20 requires TypeScript ^5.8.x, not 5.9+
- Missing @angular/compiler: Add as dependency, not just devDependency
- Peer dependency mismatches: Ensure all Angular packages are same version
- Node.js types mismatch: `@types/node` must match Node.js version in `.prototools`

## Dependencies

- Angular 20+ with standalone components
- Node.js 22+ (managed via Proto tools - see `.prototools`)
- pnpm 10+ (managed via Proto tools - see `.prototools`)
- Biome for linting/formatting (configured in `biome.json`)
- TypeScript with strict mode enabled

## Development Environment

This project uses [Proto](https://moonrepo.dev/proto) for managing development tools:
- `.prototools` defines Node.js ^22 and pnpm ^10 versions
- Run `proto install` to install the correct versions
- Proto ensures all developers use consistent tool versions
- `@types/node` should match the Node.js version specified in `.prototools`