# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm serve` - Run the demo application with hot reload
- `pnpm build` - Build the angular-router-menus library  
- `pnpm watch` - Build the library in watch mode
- `pnpm release` - Build and publish the library to npm

### Code Quality
- `pnpm lint` - Run Biome linter to check code quality
- `pnpm format` - Format code with Biome (modifies files)

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

## Dependencies

- Angular 20+ with standalone components
- Node.js 22+
- pnpm package manager
- Biome for linting/formatting (configured in `biome.json`)
- TypeScript with strict mode enabled