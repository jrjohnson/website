import { test, expect } from '@playwright/test';

test('Talks', async ({ page }) => {
  await page.goto('/talks');

  await expect(page.getByRole('heading', { level: 2 })).toContainText('Talks');
  const main = page.getByRole('main');
  await expect(main.getByRole('list')).toHaveCount(1);
});
