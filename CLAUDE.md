# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is an early-stage Playwright test automation framework (CommonJS, `@playwright/test`). There is currently no page-object layer, no fixtures, and no npm scripts defined — tests are plain `test()` blocks run directly via the Playwright CLI.

## Commands

- Run all tests: `npx playwright test`
- Run a single test file: `npx playwright test tests/UIBasicstest.js`
- Run a single test by name: `npx playwright test -g "First Playwright test"`
- Show the HTML report after a run: `npx playwright show-report`
- Install/update Playwright browsers: `npx playwright install --with-deps`

There is no lint or build step configured (`package.json` has no `scripts`).

## Architecture

- `playwright.config.js` — single config, CommonJS-exported (`module.exports = config`), `testDir: './tests'`, 40s test/expect timeouts, `browserName: 'chromium'` only (Firefox/WebKit are not configured as projects), HTML reporter.
- `tests/` — flat directory of test spec files; no fixtures, page objects, or shared helpers exist yet. New tests should follow the existing file's pattern of `require('@playwright/test')` and `test('name', async ({ page/browser }) => {...})`.
- CI (`.github/workflows/playwright.yml`) runs on push/PR to `main`/`master`: `npm ci` → `npx playwright install --with-deps` → `npx playwright test`, then uploads the `playwright-report/` artifact.
- `playwright-report/` and `test-results/` are generated output (git-ignored) — don't hand-edit or commit into them.
