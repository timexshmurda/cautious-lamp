import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import Home from "../page";

// Mock next/link with proper types and displayName
const MockNextLink = ({ children, href }: { children: ReactNode; href: string }) => {
  return <a href={href}>{children}</a>;
};
MockNextLink.displayName = "MockNextLink";

jest.mock("next/link", () => MockNextLink);

describe("Home", () => {
  it("renders the main heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /recipe finder/i,
    });

    expect(heading).toBeInTheDocument();
  });
});


