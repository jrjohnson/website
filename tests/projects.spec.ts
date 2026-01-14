import { test, expect } from '@playwright/test';

test('Projects', async ({ page }) => {
  await page.goto('/projects');

  await expect(page.getByRole('heading', { level: 2 })).toContainText('Projects');
  await expect(page.getByRole('heading', { level: 3 })).toContainText('Github Contributions');
});
