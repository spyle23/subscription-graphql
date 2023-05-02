import React from "react";
import { render, screen } from "@testing-library/react";
import { Message } from "../src/pages/Message/Message";
import { GraphqlProvider } from "../src/providers/GraphqlProvider";

describe("render Message page", () => {
  test("test message", () => {
    render(<Message />, {
      wrapper: GraphqlProvider,
    });
    const headingText = screen.getByRole("heading");
    expect(headingText).toHaveTextContent("Messages")
  });
});
