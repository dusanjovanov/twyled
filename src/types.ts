import { DefaultTheme, GenericTheme } from "./defaultTheme";

type CSSProp<T> = keyof T | (string & {});

export type Theme<T> = T & DefaultTheme;

type P<T, S extends keyof DefaultTheme> = CSSProp<Theme<T>[S]>;

// BORDER

type BorderWidthProp<T extends GenericTheme> = P<T, "borderWidth">;
type BorderStyleProp<T extends GenericTheme> = P<T, "borderStyle">;
type BorderColorProp<T extends GenericTheme> = P<T, "borderColor">;

type BorderShorthandProp<T extends GenericTheme> = Partial<{
  width: BorderWidthProp<T>;
  style: BorderStyleProp<T>;
  color: BorderColorProp<T>;
}>;

// OUTLINE

type OutlineWidthProp<T extends GenericTheme> = P<T, "outlineWidth">;
type OutlineStyleProp<T extends GenericTheme> = P<T, "outlineStyle">;
type OutlineColorProp<T extends GenericTheme> = P<T, "outlineColor">;
type OutlineOffsetProp<T extends GenericTheme> = P<T, "outlineOffset">;

type OutlineShorthandProp<T extends GenericTheme> = Partial<{
  width: OutlineWidthProp<T>;
  style: OutlineStyleProp<T>;
  color: OutlineColorProp<T>;
}>;

type TransitionPropertyProp<T extends GenericTheme> = P<
  T,
  "transitionProperty"
>;
type TransitionDurationProp<T extends GenericTheme> = P<
  T,
  "transitionDuration"
>;
type TransitionDelayProp<T extends GenericTheme> = P<T, "transitionDelay">;
type TransitionTimingFunctionProp<T extends GenericTheme> = P<
  T,
  "transitionTimingFunction"
>;

type TransitionShorthandProp<T extends GenericTheme> = Partial<{
  property: TransitionPropertyProp<T>;
  duration: TransitionDurationProp<T>;
  delay: TransitionDelayProp<T>;
  timingFunction: TransitionTimingFunctionProp<T>;
}>;

export type BaseCSSProps<T extends GenericTheme> = Partial<{
  // COLOR
  bg: P<T, "backgroundColor">;
  color: P<T, "color">;
  fill: P<T, "fill">;
  // FONT
  fontFamily: P<T, "fontFamily">;
  fontSize: P<T, "fontSize">;
  fontWeight: P<T, "fontWeight">;
  fontStyle: P<T, "fontStyle">;
  lineHeight: P<T, "lineHeight">;
  // SPACING
  p: P<T, "padding">;
  pl: P<T, "padding">;
  pr: P<T, "padding">;
  pt: P<T, "padding">;
  pb: P<T, "padding">;
  px: P<T, "padding">;
  py: P<T, "padding">;
  m: P<T, "margin">;
  ml: P<T, "margin">;
  mr: P<T, "margin">;
  mt: P<T, "margin">;
  mb: P<T, "margin">;
  mx: P<T, "margin">;
  my: P<T, "margin">;
  // SIZE
  w: P<T, "width">;
  minW: P<T, "minWidth">;
  maxW: P<T, "maxWidth">;
  h: P<T, "height">;
  minH: P<T, "minHeight">;
  maxH: P<T, "maxHeight">;
  // FLEX
  alignItems: P<T, "alignItems">;
  justifyContent: P<T, "justifyContent">;
  flexDirection: P<T, "flexDirection">;
  flexWrap: P<T, "flexWrap">;
  gap: P<T, "gap">;
  grow: P<T, "flexGrow">;
  shrink: P<T, "flexShrink">;
  basis: P<T, "flexBasis">;
  flex: P<T, "flex">;
  justifySelf: P<T, "justifySelf">;
  alignSelf: P<T, "alignSelf">;
  order: P<T, "order">;
  // RADIUS
  rounded: P<T, "borderRadius">;
  roundedLeft: P<T, "borderRadius">;
  roundedRight: P<T, "borderRadius">;
  roundedTop: P<T, "borderRadius">;
  roundedBottom: P<T, "borderRadius">;
  roundedTopLeft: P<T, "borderRadius">;
  roundedTopRight: P<T, "borderRadius">;
  roundedBottomLeft: P<T, "borderRadius">;
  roundedBottomRight: P<T, "borderRadius">;
  // DISPLAY
  display: P<T, "display">;
  // BORDER
  // shorthands
  border: P<T, "borderWidth">;
  borderLeft: BorderShorthandProp<T>;
  borderRight: BorderShorthandProp<T>;
  borderTop: BorderShorthandProp<T>;
  borderBottom: BorderShorthandProp<T>;
  borderX: BorderShorthandProp<T>;
  borderY: BorderShorthandProp<T>;
  // width
  borderWidth: BorderWidthProp<T>;
  borderLeftWidth: BorderWidthProp<T>;
  borderRightWidth: BorderWidthProp<T>;
  borderTopWidth: BorderWidthProp<T>;
  borderBottomWidth: BorderWidthProp<T>;
  borderXWidth: BorderWidthProp<T>;
  borderYWidth: BorderWidthProp<T>;
  // style
  borderStyle: BorderStyleProp<T>;
  borderLeftStyle: BorderStyleProp<T>;
  borderRightStyle: BorderStyleProp<T>;
  borderTopStyle: BorderStyleProp<T>;
  borderBottomStyle: BorderStyleProp<T>;
  borderXStyle: BorderStyleProp<T>;
  borderYStyle: BorderStyleProp<T>;
  // color
  borderColor: BorderColorProp<T>;
  borderLeftColor: BorderColorProp<T>;
  borderRightColor: BorderColorProp<T>;
  borderTopColor: BorderColorProp<T>;
  borderBottomColor: BorderColorProp<T>;
  borderXColor: BorderColorProp<T>;
  borderYColor: BorderColorProp<T>;
  // OUTLINE
  outline: OutlineShorthandProp<T>;
  outlineWidth: OutlineWidthProp<T>;
  outlineStyle: OutlineStyleProp<T>;
  outlineColor: OutlineColorProp<T>;
  outlineOffset: OutlineOffsetProp<T>;
  // CURSOR
  cursor: P<T, "cursor">;
  // TRANSITION
  transition: TransitionShorthandProp<T>;
  transitionProperty: TransitionPropertyProp<T>;
  transitionDuration: TransitionDurationProp<T>;
  transitionDelay: TransitionDelayProp<T>;
  transitionTimingFunction: TransitionTimingFunctionProp<T>;
  // POSITION
  position: P<T, "position">;
  top: P<T, "top">;
  bottom: P<T, "bottom">;
  left: P<T, "left">;
  right: P<T, "right">;
  // VISIBILITY
  visibility: P<T, "visibility">;
  // Z-INDEX
  zIndex: P<T, "zIndex">;
  // OVERFLOW
  overflow: P<T, "overflow">;
  overflowX: P<T, "overflow">;
  overflowY: P<T, "overflow">;
  // LISTS
  listStyleType: P<T, "listStyleType">;
}>;

export type CSSProps<Theme extends GenericTheme> = CSSPropsMediaQueries<Theme> &
  CSSPropsPseudoSelectors<Theme> &
  BaseCSSProps<Theme>;

export type CSSPropsMediaQueries<Theme extends GenericTheme> = Partial<
  Record<
    `$media:${Extract<keyof Theme["breakPoints"], string>}`,
    CSSPropsPseudoSelectors<Theme> & BaseCSSProps<Theme>
  >
>;

export type CSSPropsPseudoSelectors<Theme extends GenericTheme> = {
  $hover?: BaseCSSProps<Theme>;
  $focus?: BaseCSSProps<Theme>;
  $active?: BaseCSSProps<Theme>;
  $disabled?: BaseCSSProps<Theme>;
};

export type BlocksComponent<
  E extends React.ElementType,
  Theme extends GenericTheme
> = React.ForwardRefExoticComponent<
  React.ComponentPropsWithRef<E> & CSSProps<Theme>
>;
