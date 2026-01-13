import { test, expect } from '@playwright/test';
import { takeScreenshot } from './screenshot';

test('splash page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle("Home | Jon's Personal Site");
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Jonathan Johnson');
  await expect(page.getByRole('listitem')).toHaveCount(6);

  await takeScreenshot(page, 'splash');
});
