import { expect, type Page, test } from "@playwright/test";
import hentSkattekort from "./stubs/hent-skattekort.json" with { type: "json" };

test.describe("Axe a11y", () => {
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
		await forThisTest({
			page,
			routename: "*/**/hent-skattekort",
			returns: hentSkattekort,
		});
		await forThisTest({
			page,
			routename: "*/**/hent-navn",
			returns: { data: "SKEPTISK EPLEKAKE" },
		});

		await page.getByRole("textbox", { name: "Gjelder" }).fill("01010112345");
		await page.getByRole("button", { name: "Søk", exact: true }).click();

		await expect(page.getByText("SKEPTISK EPLEKAKE")).toBeVisible();
		const skattekort = page.getByLabel(/Skattekort/);
		await expect(skattekort).toHaveCount(3);
		await skattekort.first().click();
		const first = page
			.getByRole("paragraph")
			.filter({ hasText: "Kilde: Dolly" });
		await expect(first).toBeVisible();
	});
});

async function forThisTest<T>({
	page,
	routename,
	returns,
}: {
	page: Page;
	routename: string;
	returns: T;
}) {
	await page.route(routename, async (route) => {
		await route.fulfill({ json: returns });
	});
}
