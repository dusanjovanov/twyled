# twyled

React UI library. Inspired by Tailwind & Styled System

> ⚠️ Still a work in progress

### Usage

```tsx
import {
  createTwyled,
  defaultColorsTheme,
  defaultFontSizeTheme,
  defaultBorderRadiusTheme,
} from "twyled";

const { twyled } = createTwyled({
  colors: {
    ...defaultColorsTheme,
    primary: "dodgerblue",
  },
  fontSize: defaultFontSizeTheme,
  spacing: defaultSpacingTheme,
  borderRadius: defaultBorderRadiusTheme,
});

const Box = twyled("div");

<Box mb="2" bg="green500" />;

const Flex = twyled("div", {
  defaults: { display: "flex", alignItems: "center" },
});

<Flex gap="4" justifyContent="center">
  <Box>First</Box>
  <Box>Second</Box>
</Flex>;

const Button = twyled("button", {
  variants: {
    size: {
      medium: {
        fontSize: "base",
        px: 2,
        py: 1.5,
        rounded: "md",
      },
      large: {
        fontSize: "lg",
        px: 2.5,
        py: 2,
        rounded: "lg",
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

<Button>Medium button</Button>;
<Button size="large">Large button</Button>;
```
