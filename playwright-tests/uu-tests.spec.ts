import { expect, test } from "@playwright/test";
import hentSkattekort from "./stubs/hent-skattekort.json" with { type: "json" };

test.describe("Arbeidsflaten Skattekort", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/skattekort");
		await page.waitForLoadState("networkidle");
		await expect(
			page.getByRole("heading", { name: /skattekort/i }),
		).toBeVisible();
	});
	test("should display error when fnr is too short", async ({ page }) => {
		await page.getByRole("textbox", { name: "Gjelder" }).fill("123");
		await page.getByRole("button", { name: "Søk", exact: true }).click();
		const feilmelding = page.getByText(
			/Fødsels eller D-nummer må være 11 siffer/,
		);

		await expect(feilmelding).toBeVisible();
	});
	test("should display name and skattekort when the backend returns skattekorts and name", async ({
		page,
	}) => {
		await page.route("*/**/hent-skattekort", async (route) => {
			await route.fulfill({ json: hentSkattekort });
		});
		await page.route("*/**/hent-navn", async (route) => {
			await route.fulfill({ json: { data: "SKEPTISK EPLEKAKE" } });
		});

		await page.getByRole("textbox", { name: "Gjelder" }).fill("01010112345");
		await page.getByRole("button", { name: "Søk", exact: true }).click();
		await expect(page.getByText(/SKEPTISK EPLEKAKE/)).toBeVisible();

		const skattekort = page.getByLabel(/Skattekort/);
		await expect(skattekort).toHaveCount(3);

		await skattekort.first().click();
		await page.pause();
		const first = page.getByText("Har ikke skattekort", { exact: true });
		await expect(first).toBeVisible();
	});
});
