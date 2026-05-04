import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import Header from "./Header";
import { renderWithRouter } from "../../renderWithRouter";
import { userEvent } from "@testing-library/user-event";
import Masters from "../Masters/Masters";
import { Route, Routes } from "react-router";

describe("Header", () => {
  it("Need to be rendered on app", () => {
    renderWithRouter(<Header />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("Need to change page after click navigation button", async () => {
    renderWithRouter(
      <>
        <Header />
        <Routes>
          <Route path="/" element={<div data-testid="home-test">Home</div>} />
          <Route path="/masters" element={<Masters />} />
        </Routes>
      </>,
    );

    const navButton = screen.getByRole("link", { name: /mistrzowie/i });

    await userEvent.click(navButton);

    expect(screen.queryByTestId("home-test")).not.toBeInTheDocument();
    expect(await screen.findByTestId("masters")).toBeInTheDocument();
  });

  it("Need to show burger menu icon on small displays and open menu after click it", async () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 500,
    });

    renderWithRouter(<Header />);

    const burgerMenuButton = screen.getByAltText(/burger menu/i);

    expect(burgerMenuButton).toBeInTheDocument();

    await userEvent.click(burgerMenuButton);

    expect(screen.getByTestId("burger-menu")).toBeInTheDocument();
  });
});
