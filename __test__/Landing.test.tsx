import React from "react";
import { render } from "@testing-library/react";
import  Landing  from "../src/pages/Landing/Landing";
import { GraphqlProvider } from "../src/providers/GraphqlProvider";
test("test render app", () => {
  render(<Landing />, {
    wrapper: GraphqlProvider
  });
});
