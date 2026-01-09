import { test, expect } from '@playwright/test';

test('splash page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle("Jon's Personal Site");
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Jonathan Johnson');
  await expect(page.getByRole('listitem')).toHaveCount(6);
});
