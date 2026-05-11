import { formatPrice } from "../format";

describe("formatPrice", () => {
  it("should format a price as HUF currency", () => {
    const result = formatPrice(3490);

    expect(result).toContain("Ft");
    expect(result).toMatch(/3\s?490/);
  });
});
