# twyled

React UI library. Inspired by Tailwind & Styled System

> ⚠️ Still a work in progress

### Usage

```tsx
import { createTwyled, defaultTheme } from "twyled";

const { twyled, createVariants, ThemeProvider } = createTwyled({
  theme: defaultTheme,
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
  variants: createVariants({
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
  }),
  defaultVariants: {
    size: "medium",
  },
});

<Button>Medium button</Button>;
<Button size="large">Large button</Button>;
```

> ℹ️ You need to wrap your component tree with ThemeProvider
