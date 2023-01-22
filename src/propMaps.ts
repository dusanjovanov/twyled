import { CSSObject, CSSProperties } from "@emotion/serialize";
import {
  BaseCSSProps,
  CSSPropsPseudoClasses,
  CSSPropsPseudoElements,
  GenericTheme,
} from "./types";

const getValue = (theme, slot, value) => {
  return theme[slot][value] ?? value;
};

const themed =
  (
    slot: keyof GenericTheme,
    cssProperty: keyof CSSProperties | Array<keyof CSSProperties>,
    options?: { css?: any; concatenate?: string }
  ) =>
  (value, theme) => {
    const { css, concatenate } = options ?? {};
    if (Array.isArray(cssProperty)) {
      let cssObject = {};
      for (const cssProp of cssProperty) {
        cssObject = {
          ...cssObject,
          [cssProp]: getValue(theme, slot, value) + (concatenate ?? ""),
        };
      }
      return cssObject;
    }
    return {
      [cssProperty]: getValue(theme, slot, value) + (concatenate ?? ""),
      ...css,
    };
  };

const alias = (cssProperty: keyof CSSProperties) => (value) => {
  return {
    [cssProperty]: value,
  };
};

const custom = (cssObject: CSSObject) => () => {
  return cssObject;
};

export const propMap: Record<keyof BaseCSSProps<GenericTheme>, any> = {
  // LAYOUT
  boxSizing: 1,
  display: 1,
  position: 1,
  top: 1,
  bottom: 1,
  left: 1,
  right: 1,
  visibility: 1,
  zIndex: themed("zIndex", "zIndex"),
  overflow: 1,
  overflowX: 1,
  overflowY: 1,
  objectFit: 1,
  // TEXT
  color: themed("colors", "color"),
  fontFamily: themed("fontFamily", "fontFamily"),
  fontSize: themed("fontSize", "fontSize"),
  fontWeight: themed("fontWeight", "fontWeight"),
  fontStyle: 1,
  lineHeight: themed("lineHeight", "lineHeight"),
  textDecoration: alias("textDecorationLine"),
  textDecorationColor: themed("colors", "textDecorationColor"),
  textDecorationStyle: 1,
  textDecorationThickness: 1,
  textUnderlineOffset: 1,
  textTransform: 1,
  textOverflow: 1,
  verticalAlign: 1,
  whiteSpace: 1,
  wordBreak: 1,
  textAlign: 1,
  letterSpacing: 1,
  content: 1,
  // COLORS
  bg: themed("colors", "backgroundColor"),
  bgAttachment: alias("backgroundAttachment"),
  bgClip: alias("backgroundClip"),
  bgOrigin: alias("backgroundOrigin"),
  bgPosition: alias("backgroundPosition"),
  bgRepat: alias("backgroundRepeat"),
  bgSize: alias("backgroundSize"),
  bgImage: alias("backgroundImage"),
  // SPACING
  p: themed("spacing", "padding"),
  px: themed("spacing", ["paddingLeft", "paddingRight"]),
  py: themed("spacing", ["paddingTop", "paddingBottom"]),
  pl: themed("spacing", "paddingLeft"),
  pr: themed("spacing", "paddingRight"),
  pt: themed("spacing", "paddingTop"),
  pb: themed("spacing", "paddingBottom"),
  m: themed("spacing", "margin"),
  mx: themed("spacing", ["marginLeft", "marginRight"]),
  my: themed("spacing", ["marginTop", "marginBottom"]),
  ml: themed("spacing", "marginLeft"),
  mr: themed("spacing", "marginRight"),
  mt: themed("spacing", "marginTop"),
  mb: themed("spacing", "marginBottom"),
  w: alias("width"),
  minW: alias("minWidth"),
  maxW: alias("maxWidth"),
  h: alias("height"),
  minH: alias("minHeight"),
  maxH: alias("maxHeight"),
  // FLEX
  alignItems: 1,
  justifyContent: 1,
  flexDirection: 1,
  flexWrap: 1,
  gap: themed("spacing", "gap"),
  grow: 1,
  shrink: 1,
  basis: themed("spacing", "flexBasis"),
  flex: 1,
  justifySelf: 1,
  alignSelf: 1,
  order: 1,
  // GRID
  gridTemplateColumns: 1,
  gridColumn: 1,
  gridTemplateRows: 1,
  gridRow: 1,
  gridAutoFlow: 1,
  gridAutoColumns: 1,
  gridAutoRows: 1,
  placeContent: 1,
  placeItems: 1,
  placeSelf: 1,
  // RADIUS
  rounded: themed("borderRadius", "borderRadius"),
  roundedLeft: themed("borderRadius", [
    "borderTopLeftRadius",
    "borderBottomLeftRadius",
  ]),
  roundedRight: themed("borderRadius", [
    "borderTopRightRadius",
    "borderBottomRightRadius",
  ]),
  roundedTop: themed("borderRadius", [
    "borderTopLeftRadius",
    "borderTopRightRadius",
  ]),
  roundedBottom: themed("borderRadius", [
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
  ]),
  roundedTopLeft: themed("borderRadius", "borderTopLeftRadius"),
  roundedTopRight: themed("borderRadius", "borderTopRightRadius"),
  roundedBottomLeft: themed("borderRadius", "borderBottomLeftRadius"),
  roundedBottomRight: themed("borderRadius", "borderBottomRightRadius"),
  // BORDER
  border: themed("borderWidth", "border", { concatenate: " solid" }),
  borderLeft: themed("borderWidth", "borderLeft", { concatenate: " solid" }),
  borderRight: themed("borderWidth", "borderRight", { concatenate: " solid" }),
  borderTop: themed("borderWidth", "borderTop", { concatenate: " solid" }),
  borderBottom: themed("borderWidth", "borderBottom", {
    concatenate: " solid",
  }),
  borderX: themed("borderWidth", ["borderLeft", "borderRight"], {
    concatenate: " solid",
  }),
  borderY: themed("borderWidth", ["borderTop", "borderBottom"], {
    concatenate: " solid",
  }),
  // width
  borderWidth: themed("borderWidth", "borderWidth"),
  borderLeftWidth: themed("borderWidth", "borderLeftWidth"),
  borderRightWidth: themed("borderWidth", "borderRightWidth"),
  borderTopWidth: themed("borderWidth", "borderTopWidth"),
  borderBottomWidth: themed("borderWidth", "borderBottomWidth"),
  borderXWidth: themed("borderWidth", ["borderLeftWidth", "borderRightWidth"]),
  borderYWidth: themed("borderWidth", ["borderTopWidth", "borderBottomWidth"]),
  // style
  borderStyle: 1,
  borderLeftStyle: 1,
  borderRightStyle: 1,
  borderTopStyle: 1,
  borderBottomStyle: 1,
  borderXStyle: 1,
  borderYStyle: 1,
  // color
  borderColor: themed("colors", "borderColor"),
  borderLeftColor: themed("colors", "borderLeftColor"),
  borderRightColor: themed("colors", "borderRightColor"),
  borderTopColor: themed("colors", "borderTopColor"),
  borderBottomColor: themed("colors", "borderBottomColor"),
  borderXColor: themed("colors", ["borderLeftColor", "borderRightColor"]),
  borderYColor: themed("colors", ["borderTopColor", "borderBottomColor"]),
  // OUTLINE
  outline: themed("borderWidth", "outline", { concatenate: " solid #000" }),
  outlineWidth: themed("borderWidth", "outlineWidth"),
  outlineStyle: 1,
  outlineColor: themed("colors", "outlineColor"),
  outlineOffset: themed("borderWidth", "outlineOffset"),
  // TRANSITION
  transitionProperty: 1,
  transitionDuration: 1,
  transitionDelay: 1,
  transitionTimingFunction: 1,
  // LISTS
  listStyleType: 1,
  listStylePosition: 1,
  // TABLES
  borderCollapse: 1,
  borderSpacing: 1,
  tableLayout: 1,
  //
  transition: 1,
  // HELPERS
  truncate: custom({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  //
  opacity: 1,
  // TRANSFORM
  transform: 1,
  transformOrigin: 1,
  // INTERACTIVITY
  accentColor: themed("colors", "accentColor"),
  appearance: 1,
  caretColor: themed("colors", "caretColor"),
  cursor: 1,
  pointerEvents: 1,
  resize: 1,
  scrollBehavior: 1,
  userSelect: 1,
  // SVG
  fill: themed("colors", "fill"),
  stroke: themed("colors", "stroke"),
  strokeWidth: 1,
};

export const pseudoClassesMap: Record<
  keyof CSSPropsPseudoClasses<GenericTheme>,
  string | number
> = {
  $hover: 1,
  $focus: 1,
  $focusVisible: 1,
  $focusWithin: 1,
  $active: 1,
  $visited: 1,
  $target: 1,
  $firstOfType: 1,
  $lastOfType: 1,
  $onlyOfType: 1,
  $empty: 1,
  $disabled: 1,
  $enabled: 1,
  $checked: 1,
  $indeterminate: 1,
  $default: 1,
  $required: 1,
  $valid: 1,
  $invalid: 1,
  $inRange: 1,
  $outOfRange: 1,
  $placeholderShown: 1,
  $autofill: 1,
  $readOnly: 1,
};

export const pseudoElementsMap: Record<
  keyof CSSPropsPseudoElements<GenericTheme>,
  string | number
> = {
  $before: 1,
  $after: 1,
  $selection: 1,
  $marker: 1,
  $placeholder: 1,
  $fileSelectorButton: 1,
};
