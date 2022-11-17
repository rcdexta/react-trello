const initStoryshots = require("@storybook/addon-storyshots").default;
import path from "path";
import { render } from "@testing-library/react";

import "jest-styled-components";
initStoryshots({
	framework: "react",
	configPath: path.join(__dirname, "..", ".storybook"),
	renderer: render,
});
