import { afterAll, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import Footer from "./Footer";
import { renderWithRouter } from "../../renderWithRouter";

describe("Footer", () => {
  afterAll(() => {
    vi.useRealTimers();
  });

  it("Need to be rendered on app", () => {
    renderWithRouter(<Footer />);

    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("Need to render exact text on footer on 2025", () => {
    vi.setSystemTime(new Date(2025, 1, 1));

    renderWithRouter(<Footer />);

    expect(screen.getByTestId("footer")).toHaveTextContent(
      "© 2025, wszystkie prawa są zastrzeżone.",
    );
  });

  it("Need to render exact text on footer on 2028", () => {
    vi.setSystemTime(new Date(2028, 1, 1));

    renderWithRouter(<Footer />);

    expect(screen.getByTestId("footer")).toHaveTextContent(
      "© 2025-2028, wszystkie prawa są zastrzeżone.",
    );
  });
});
