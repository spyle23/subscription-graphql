import React from "react";
import { render, screen } from "@testing-library/react";
import { Profile } from "../src/pages/Profile/Profile";
import { GraphqlProvider } from "../src/providers/GraphqlProvider";

test("test render Profile", () => {
    render(<Profile />, {
        wrapper: GraphqlProvider,
    });
    const titleElement = screen.getByRole("heading")
    expect(titleElement).toHaveTextContent("Information du compte:")
});
