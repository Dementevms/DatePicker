import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CB from "../CB";

test("initial render", () => {
  render(<CB />);
  const text = screen.getByText("0");

  expect(text).toBeInTheDocument();
});

test("shoulde call increment", () => {
  render(<CB />);
  fireEvent.click(screen.getByText("+"));

  expect(screen.getByText("1")).toBeInTheDocument();
});

test("shoulde call decrement", () => {
  const { container } = render(<CB />);
  fireEvent.click(screen.getByText("-"));

  expect(container.querySelector(".result")?.textContent).toBe("-1");
});

test("shoulde call clickDocument", async () => {
  const { container } = render(<CB value={1} />);

  userEvent.click(container);

  expect(container.querySelector(".result")).toHaveTextContent("0");
});
