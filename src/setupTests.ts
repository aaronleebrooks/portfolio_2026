import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import "./i18n";

// jest-axe ships without typed expect.extend matchers
expect.extend(toHaveNoViolations as never);
