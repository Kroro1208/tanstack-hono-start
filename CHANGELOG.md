# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-01-12

### Breaking Changes
- **ESM Migration**: Package is now ESM-only (`"type": "module"`)
  - CommonJS (`require()`) is no longer supported
  - All imports now require `.js` file extensions
- **Node.js Requirement**: Minimum Node.js version is now **>=20.12.0**
  - Previous minimum was >=18.0.0
- **inquirer v13**: Upgraded from v12 to v13
  - Prompt type `list` has been replaced with `select`
  - ESM-only package

### Added
- Dynamic inquirer loader for better compatibility
- SKIP_INSTALL environment variable for testing
- Comprehensive CHANGELOG documentation

### Changed
- TypeScript configuration: `module: "NodeNext"` with `moduleResolution: "NodeNext"`
- Jest configuration updated for ESM support with experimental VM modules
- Test mocking migrated to `jest.unstable_mockModule`
- All source files updated with `.js` import extensions

### Fixed
- All tests passing (20/20) with ESM configuration

### Security
- Updated glob from 10.4.5 to 10.5.0 (fixes CVE GHSA-5j98-mcp5-4vw2)
- Updated js-yaml to 3.14.2+ (fixes prototype pollution GHSA-mh29-5h37-fv8m)
- fs-extra updated to 11.3.3 (symlink copy fix)
- @types/node updated to 25.0.3
- Zero vulnerabilities (npm audit clean)
