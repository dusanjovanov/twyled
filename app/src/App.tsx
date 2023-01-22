import React from "react";
import { createTwyled, defaultTheme } from "twyled";

const { twyled, createVariants, ThemeProvider } = createTwyled({
  theme: defaultTheme,
});

const Heading1 = twyled("h1");

const Button = twyled("button", {
  defaults: {
    css: {
      all: "unset",
    },
  },
  variants: createVariants({
    size: {
      small: {
        fontSize: "sm",
        py: "1.5",
        px: "2",
        rounded: "md",
      },
      medium: {
        fontSize: "base",
        py: "2",
        px: "3",
        rounded: "md",
      },
      large: {
        fontSize: "lg",
      },
    },
    variant: {
      primary: {
        bg: "blue600",
        color: "white",
        $hover: {
          bg: "blue700",
        },
      },
      neutral: {
        bg: "gray200",
        color: "black",
        $hover: {
          bg: "gray300",
        },
      },
    },
  }),
  defaultVariants: {
    size: "medium",
    variant: "primary",
  },
});

const Flex = twyled("div", {
  defaults: { display: "flex", alignItems: "center" },
});

Flex.displayName = "Flex";

const Box = twyled("div");

const Table = twyled("table");

const TableRow = twyled("tr", {
  defaults: {
    $evenOfType: {
      bg: "purple600",
    },
  },
});

const TableHeadCell = twyled("th", { defaults: { p: "2", border: "1" } });
const TableCell = twyled("td", { defaults: { p: "2", border: "1" } });

const Form = twyled("form");

const Input = twyled("input", {
  defaults: {
    px: "3",
    py: "2",
    rounded: "md",
    fontSize: "sm",
    border: "1",
    outlineColor: "blue600",
  },
});

const Select = twyled("select", {
  defaults: {
    css: {
      appearance: "none",
    },
    px: "2",
    py: "2",
    rounded: "md",
    fontSize: "sm",
    border: "1",
    outlineColor: "blue600",
  },
});

const Label = twyled("label", { defaults: { fontSize: "sm" } });

const Checkbox = twyled("input", {
  defaults: {
    w: "20px",
    h: "20px",
  },
});

Checkbox.defaultProps = {
  type: "checkbox",
};

const TextArea = twyled("textarea", {
  defaults: {
    border: "1",
    rounded: "md",
    outlineColor: "blue600",
  },
});

const Svg = twyled(({ className }: { className?: string }) => (
  <svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="2"
    width="96"
    height="96"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z"
      fillRule="nonzero"
    />
  </svg>
));

function App() {
  return (
    <ThemeProvider>
      <Box h="100vh" bg="white">
        <Heading1
          bg="lime500"
          h="40px"
          textDecoration="underline"
          textDecorationColor="purple500"
          textDecorationStyle="wavy"
          textTransform="uppercase"
          truncate
          verticalAlign="middle"
        >
          Title
        </Heading1>
        <Box h="calc(100vh - 40px)" overflow="scroll">
          <Box>
            <Flex p="4" gap="2" borderY="1">
              <Button size="small">Small</Button>
              <Button>Medium</Button>
            </Flex>
            <Flex p="4" gap="2">
              <Button variant="neutral" size="small">
                Small
              </Button>
              <Button variant="neutral">Medium</Button>
            </Flex>
          </Box>
          <Table
            borderCollapse="collapse"
            mb="10"
            bg="red400"
            tableLayout="fixed"
          >
            <thead>
              <TableRow bg="white">
                <TableHeadCell>First name</TableHeadCell>
                <TableHeadCell>Last name</TableHeadCell>
              </TableRow>
            </thead>
            <tbody>
              <TableRow bg="gray200">
                <TableCell>Mickey</TableCell>
                <TableCell>Mouse</TableCell>
              </TableRow>
              <TableRow bg="gray200">
                <TableCell>Mickey</TableCell>
                <TableCell>Mouse</TableCell>
              </TableRow>
              <TableRow bg="gray200">
                <TableCell>Mickey</TableCell>
                <TableCell>Mouse</TableCell>
              </TableRow>
              <TableRow bg="gray200">
                <TableCell>Mickey</TableCell>
                <TableCell>Mouse</TableCell>
              </TableRow>
              <TableRow bg="gray200">
                <TableCell>Mickey</TableCell>
                <TableCell>Mouse</TableCell>
              </TableRow>
              <TableRow bg="gray200">
                <TableCell>Mickey</TableCell>
                <TableCell>Mouse</TableCell>
              </TableRow>
            </tbody>
          </Table>
          <Form w="50%" bg="white" p="4" rounded="md">
            <Box mb="2">
              <Label htmlFor="firstName" display="block" mb="2">
                First name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="First name"
                autoComplete="off"
                w="100%"
              />
            </Box>
            <Box mb="4">
              <Label htmlFor="country" display="block" mb="2">
                Country
              </Label>
              <Select
                id="country"
                name="country"
                placeholder="First name"
                autoComplete="off"
                defaultValue="Serbia"
                w="100%"
              >
                <option>Serbia</option>
                <option>Argentina</option>
                <option>France</option>
              </Select>
            </Box>
            <Box mb="4">
              <Label display="block" mb="2">
                Comment
              </Label>
              <TextArea
                resize="vertical"
                w="100%"
                h="100px"
                fontFamily="sans"
                p="2"
              />
            </Box>
            <Flex mb="4" gap="2">
              <Checkbox id="terms" name="terms" accentColor="purple600" />
              <Label htmlFor="terms">Agree to terms of service</Label>
            </Flex>
            <Flex justifyContent="end" gap="2">
              <Button variant="neutral">Cancel</Button>
              <Button>Submit</Button>
            </Flex>
          </Form>
          <Svg
            fill="purple500"
            strokeWidth="2px"
            stroke="green400"
            // bg="amber300"
            $hover={{
              fill: "green400",
              stroke: "purple500",
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
