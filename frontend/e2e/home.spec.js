import { test, expect } from '@playwright/test'

test('home page displays the WildNature header', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('img', { name: 'WildNature Volunteers' })
  ).toBeVisible()

  await expect(
    page.getByRole('link', { name: 'Помощь' })
  ).toBeVisible()
})
