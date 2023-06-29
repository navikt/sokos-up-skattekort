import { test, expect } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Skattekortvisning from "./Skattekortvisning";
import skattekortData from "./skattekortFrikort.json";

test("Viser skattekort", async () => {
  console.log(JSON.stringify(skattekortData));

  render(<Skattekortvisning data={skattekortData} />);
  act(() => {
    console.log("foo");
  });
  const byText = screen.getByText(/Skattekort/);
  expect(byText).toBeDefined();
});
