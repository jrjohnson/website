import { test, expect } from '@playwright/test';
import { takeScreenshot } from './screenshot';

test('Talks', async ({ page }) => {
  await page.goto('/talks');

  await expect(page.getByRole('heading', { level: 2 })).toContainText('Talks');
  const main = page.getByRole('main');
  await expect(main.getByRole('list')).toHaveCount(1);

  await takeScreenshot(page, 'talks');
});
