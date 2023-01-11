import { CSSProperties } from "react";
import { DefaultTheme } from "./defaultTheme";
import { BaseCSSProps } from "./types";

type PropDef =
  | keyof CSSProperties
  | [keyof DefaultTheme, keyof CSSProperties | (keyof CSSProperties)[]];

type ShorthandPropDef = Record<string, PropDef>;

type ShorthandPropDefArray = {
  shorthandArray: string[];
};

type PropDefWithSelector = {
  selector: string;
  property: PropDef;
};

type ShorthandPropDefWithSelector = {
  selector: string;
} & ShorthandPropDef;

export type PropMap = Partial<
  Record<
    keyof BaseCSSProps<DefaultTheme>,
    | PropDef
    | ShorthandPropDef
    | ShorthandPropDefArray
    | PropDefWithSelector
    | ShorthandPropDefWithSelector
  >
>;

const getValue = ({
  theme,
  slot,
  value,
}: {
  theme: any;
  slot: any;
  value: any;
}) => {
  return theme[slot][value] ?? value;
};

const single =
  (
    cssProperty: any,
    slot: any = cssProperty,
    options?: { css?: any; concatenate?: string }
  ) =>
  ({ value, theme }: { prop: any; value: any; theme: any }) => {
    const { css, concatenate } = options ?? {};
    return {
      [cssProperty]: getValue({ slot, value, theme }) + (concatenate ?? ""),
      ...css,
    };
  };

const singleCustomSlot = (slot: any, cssProperty: any) =>
  single(cssProperty, slot);

const multi =
  (themeSlot: any, cssProperties: any[], options?: { selector?: string }) =>
  ({
    value,
    theme,
    cssObject: previousCSSObject,
  }: {
    prop: any;
    value: any;
    theme: any;
    cssObject: any;
  }) => {
    const { selector } = options ?? {};
    let cssObject = { ...previousCSSObject };
    for (const cssProp of cssProperties) {
      if (selector) {
        cssObject = {
          ...cssObject,
          [selector]: {
            ...cssObject[selector],
            [cssProp]: getValue({ slot: themeSlot, value, theme }),
          },
        };
      }
      //
      else {
        cssObject = {
          ...cssObject,
          [cssProp]: getValue({ slot: themeSlot, value, theme }),
        };
      }
    }
    return cssObject;
  };

const shorthand =
  (cssProperty: string, obj: any) =>
  ({ value, theme }: { prop: any; value: any; theme: any }) => {
    let finalValue = [];
    for (const k of Object.keys(obj)) {
      const themeSlot = obj[k];
      if (!themeSlot) {
        continue;
      }
      const subPropValue = getValue({
        slot: themeSlot,
        value: value[k],
        theme,
      });
      finalValue.push(subPropValue);
    }
    return {
      [cssProperty]: finalValue.join(" "),
    };
  };

const shorthandMulti =
  (cssProperties: any[], obj: any) =>
  (args: { prop: any; value: any; theme: any }) => {
    let cssObject = {};
    for (const cssProp of cssProperties) {
      cssObject = {
        ...cssObject,
        ...shorthand(cssProp, obj)(args),
      };
    }
    return cssObject;
  };

const borderObj = {
  width: "borderWidth",
  style: "borderStyle",
  color: "borderColor",
};

export const propMap: any = {
  // COLORS
  bg: single("backgroundColor"),
  color: single("color"),
  fill: single("fill"),
  // FONT
  fontFamily: single("fontFamily"),
  fontSize: single("fontSize"),
  fontWeight: single("fontWeight"),
  fontStyle: single("fontStyle"),
  lineHeight: single("lineHeight"),
  // SPACING
  p: single("padding"),
  px: multi("padding", ["paddingLeft", "paddingRight"]),
  py: multi("padding", ["paddingTop", "paddingBottom"]),
  pl: singleCustomSlot("padding", "paddingLeft"),
  pr: singleCustomSlot("padding", "paddingRight"),
  pt: singleCustomSlot("padding", "paddingTop"),
  pb: singleCustomSlot("padding", "paddingBottom"),
  m: single("margin"),
  mx: multi("margin", ["marginLeft", "marginRight"]),
  my: multi("margin", ["marginTop", "marginBottom"]),
  ml: singleCustomSlot("margin", "marginLeft"),
  mr: singleCustomSlot("margin", "marginRight"),
  mt: singleCustomSlot("margin", "marginTop"),
  mb: singleCustomSlot("margin", "marginBottom"),
  w: single("width"),
  minW: single("minWidth"),
  maxW: single("maxWidth"),
  h: single("height"),
  minH: single("minHeight"),
  maxH: single("maxHeight"),
  // FLEX
  alignItems: single("alignItems"),
  justifyContent: single("justifyContent"),
  flexDirection: single("flexDirection"),
  flexWrap: single("flexWrap"),
  gap: single("gap"),
  grow: single("flexGrow"),
  shrink: single("flexShrink"),
  basis: single("flexBasis"),
  flex: single("flex"),
  justifySelf: single("justifySelf"),
  alignSelf: single("alignSelf"),
  order: single("order"),
  // RADIUS
  rounded: single("borderRadius"),
  roundedLeft: multi("borderRadius", [
    "borderTopLeftRadius",
    "borderBottomLeftRadius",
  ]),
  roundedRight: multi("borderRadius", [
    "borderTopRightRadius",
    "borderBottomRightRadius",
  ]),
  roundedTop: multi("borderRadius", [
    "borderTopLeftRadius",
    "borderTopRightRadius",
  ]),
  roundedBottom: multi("borderRadius", [
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
  ]),
  roundedTopLeft: singleCustomSlot("borderRadius", "borderTopLeftRadius"),
  roundedTopRight: singleCustomSlot("borderRadius", "borderTopRightRadius"),
  roundedBottomLeft: singleCustomSlot("borderRadius", "borderBottomLeftRadius"),
  roundedBottomRight: singleCustomSlot(
    "borderRadius",
    "borderBottomRightRadius"
  ),
  // DISPLAY
  display: single("display"),
  // BORDER
  border: single("border", "borderWidth", { concatenate: " solid" }),
  borderLeft: shorthand("borderLeft", borderObj),
  borderRight: shorthand("borderRight", borderObj),
  borderTop: shorthand("borderTop", borderObj),
  borderBottom: shorthand("borderBottom", borderObj),
  borderX: shorthandMulti(["borderLeft", "borderRight"], borderObj),
  borderY: shorthandMulti(["borderTop", "borderBottom"], borderObj),
  // width
  borderWidth: single("borderWidth"),
  borderLeftWidth: singleCustomSlot("borderWidth", "borderLeftWidth"),
  borderRightWidth: singleCustomSlot("borderWidth", "borderRightWidth"),
  borderTopWidth: singleCustomSlot("borderWidth", "borderTopWidth"),
  borderBottomWidth: singleCustomSlot("borderWidth", "borderBottomWidth"),
  borderXWidth: multi("borderWidth", ["borderLeftWidth", "borderRightWidth"]),
  borderYWidth: multi("borderWidth", ["borderTopWidth", "borderBottomWidth"]),
  // style
  borderStyle: single("borderStyle"),
  borderLeftStyle: singleCustomSlot("borderStyle", "borderLeftStyle"),
  borderRightStyle: singleCustomSlot("borderStyle", "borderRightStyle"),
  borderTopStyle: singleCustomSlot("borderStyle", "borderTopStyle"),
  borderBottomStyle: singleCustomSlot("borderStyle", "borderBottomStyle"),
  borderXStyle: multi("borderStyle", ["borderLeftStyle", "borderRightStyle"]),
  borderYStyle: multi("borderStyle", ["borderTopStyle", "borderBottomStyle"]),
  // color
  borderColor: single("borderColor"),
  borderLeftColor: singleCustomSlot("borderColor", "borderLeftColor"),
  borderRightColor: singleCustomSlot("borderColor", "borderRightColor"),
  borderTopColor: singleCustomSlot("borderColor", "borderTopColor"),
  borderBottomColor: singleCustomSlot("borderColor", "borderBottomColor"),
  borderXColor: multi("borderColor", ["borderLeftColor", "borderRightColor"]),
  borderYColor: multi("borderColor", ["borderTopColor", "borderBottomColor"]),
  // OUTLINE
  outline: shorthand("outline", {
    width: "outlineWidth",
    style: "outlineStyle",
    color: "outlineColor",
  }),
  outlineWidth: single("outlineWidth"),
  outlineStyle: single("outlineStyle"),
  outlineColor: single("outlineColor"),
  outlineOffset: single("outlineOffset"),
  // CURSOR
  cursor: single("cursor"),
  // TRANSITION
  transition: shorthand("transition", {
    property: "transitionProperty",
    duration: "transitionDuration",
    delay: "transitionDelay",
    timingFunction: "transitionTimingFunction",
  }),
  transitionProperty: single("transitionProperty"),
  transitionDuration: single("transitionDuration"),
  transitionDelay: single("transitionDelay"),
  transitionTimingFunction: single("transitionTimingFunction"),
  // POSITION
  position: single("position"),
  top: single("top"),
  bottom: single("bottom"),
  left: single("left"),
  right: single("right"),
  // // VISIBILITY
  visibility: single("visibility"),
  // // Z-INDEX
  zIndex: single("zIndex"),
  // OVERFLOW
  overflow: single("overflow"),
  overflowX: singleCustomSlot("overflow", "overflowX"),
  overflowY: singleCustomSlot("overflow", "overflowY"),
  // // LISTS
  listStyleType: single("listStyleType"),
};

export const pseudoSelectorsMap = {
  $hover: "&:hover",
  $focus: "&:focus",
  $active: "&:active",
  $disabled: "&:disabled",
};
