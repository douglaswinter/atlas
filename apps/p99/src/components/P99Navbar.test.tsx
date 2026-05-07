import { render, screen } from "@atlas/vitest-conf";
import { MemoryRouter } from "react-router-dom";
import { DiamondTheme, ThemeProvider } from "@diamondlightsource/sci-react-ui";
import P99Navbar from "./P99Navbar";

describe("P99Navbar", () => {
  it("renders the Navbar with a Home link", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <MemoryRouter>
          <P99Navbar />
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
  });
});
