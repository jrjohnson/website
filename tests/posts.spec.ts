import { test, expect } from '@playwright/test';
import { takeScreenshot } from './screenshot';

test('Posts', async ({ page }) => {
  await page.goto('/posts');

  await expect(page.getByRole('heading', { level: 2 })).toContainText(
    `Posts I've written collected in one place`,
  );
  const main = page.getByRole('main');
  await expect(main.getByRole('list')).toHaveCount(1);

  await takeScreenshot(page, 'posts');
});
