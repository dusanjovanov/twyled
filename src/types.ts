import { CSSObject, Interpolation } from "@emotion/react";
import { CSSProperties } from "@emotion/serialize";

type C = CSSProperties;

type P<T extends GenericTheme, S extends keyof GenericTheme> =
  | keyof T[S]
  | (string & {});

type BorderWidthProp<T extends GenericTheme> = P<T, "borderWidth">;
type BorderStyleProp = C["borderStyle"];
type BorderColorProp<T extends GenericTheme> = P<T, "colors">;

type OutlineWidthProp<T extends GenericTheme> = P<T, "borderWidth">;

type BorderRadiusProp<T extends GenericTheme> = P<T, "borderRadius">;

type SpacingProp<T extends GenericTheme> = P<T, "spacing">;

export type BaseCSSProps<T extends GenericTheme> = Partial<{
  // LAYOUT
  boxSizing: C["boxSizing"];
  display: C["display"];
  position: C["position"];
  top: C["top"];
  bottom: C["bottom"];
  left: C["left"];
  right: C["right"];
  visibility: C["visibility"];
  zIndex: P<T, "zIndex">;
  overflow: C["overflow"];
  overflowX: C["overflowX"];
  overflowY: C["overflowY"];
  objectFit: C["objectFit"];
  // TEXT
  color: P<T, "colors">;
  fontFamily: P<T, "fontFamily">;
  fontSize: P<T, "fontSize">;
  fontWeight: P<T, "fontWeight">;
  fontStyle: C["fontStyle"];
  lineHeight: P<T, "lineHeight">;
  textDecoration: C["textDecoration"];
  textDecorationColor: P<T, "colors">;
  textDecorationStyle: C["textDecorationStyle"];
  textDecorationThickness: C["textDecorationThickness"];
  textUnderlineOffset: C["textUnderlineOffset"];
  textTransform: C["textTransform"];
  textOverflow: C["textOverflow"];
  verticalAlign: C["verticalAlign"];
  whiteSpace: C["whiteSpace"];
  wordBreak: C["wordBreak"];
  textAlign: C["textAlign"];
  letterSpacing: C["letterSpacing"];
  content: C["content"];
  // BACKGROUND
  bg: P<T, "colors">;
  bgAttachment: C["backgroundAttachment"];
  bgClip: C["backgroundClip"];
  bgOrigin: C["backgroundOrigin"];
  bgPosition: C["backgroundPosition"];
  bgRepat: C["backgroundRepeat"];
  bgSize: C["backgroundSize"];
  bgImage: C["backgroundImage"];
  // SPACING
  p: SpacingProp<T>;
  pl: SpacingProp<T>;
  pr: SpacingProp<T>;
  pt: SpacingProp<T>;
  pb: SpacingProp<T>;
  px: SpacingProp<T>;
  py: SpacingProp<T>;
  m: SpacingProp<T>;
  ml: SpacingProp<T>;
  mr: SpacingProp<T>;
  mt: SpacingProp<T>;
  mb: SpacingProp<T>;
  mx: SpacingProp<T>;
  my: SpacingProp<T>;
  // SIZE
  w: C["width"];
  minW: C["minWidth"];
  maxW: C["maxWidth"];
  h: C["height"];
  minH: C["minHeight"];
  maxH: C["maxHeight"];
  // FLEX
  alignItems: C["alignItems"];
  justifyContent: C["justifyContent"];
  flexDirection: C["flexDirection"];
  flexWrap: C["flexWrap"];
  gap: SpacingProp<T>;
  grow: C["flexGrow"];
  shrink: C["flexShrink"];
  basis: SpacingProp<T>;
  flex: C["flex"];
  justifySelf: C["justifySelf"];
  alignSelf: C["alignSelf"];
  order: C["order"];
  // GRID
  gridTemplateColumns: C["gridTemplateColumns"];
  gridColumn: C["gridColumn"];
  gridTemplateRows: C["gridTemplateRows"];
  gridRow: C["gridRow"];
  gridAutoFlow: C["gridAutoFlow"];
  gridAutoColumns: C["gridAutoColumns"];
  gridAutoRows: C["gridAutoRows"];
  placeContent: C["placeContent"];
  placeItems: C["placeItems"];
  placeSelf: C["placeSelf"];
  // RADIUS
  rounded: BorderRadiusProp<T>;
  roundedLeft: BorderRadiusProp<T>;
  roundedRight: BorderRadiusProp<T>;
  roundedTop: BorderRadiusProp<T>;
  roundedBottom: BorderRadiusProp<T>;
  roundedTopLeft: BorderRadiusProp<T>;
  roundedTopRight: BorderRadiusProp<T>;
  roundedBottomLeft: BorderRadiusProp<T>;
  roundedBottomRight: BorderRadiusProp<T>;
  // BORDER
  // shorthands
  border: BorderWidthProp<T>;
  borderLeft: BorderWidthProp<T>;
  borderRight: BorderWidthProp<T>;
  borderTop: BorderWidthProp<T>;
  borderBottom: BorderWidthProp<T>;
  borderX: BorderWidthProp<T>;
  borderY: BorderWidthProp<T>;
  // width
  borderWidth: BorderWidthProp<T>;
  borderLeftWidth: BorderWidthProp<T>;
  borderRightWidth: BorderWidthProp<T>;
  borderTopWidth: BorderWidthProp<T>;
  borderBottomWidth: BorderWidthProp<T>;
  borderXWidth: BorderWidthProp<T>;
  borderYWidth: BorderWidthProp<T>;
  // style
  borderStyle: BorderStyleProp;
  borderLeftStyle: BorderStyleProp;
  borderRightStyle: BorderStyleProp;
  borderTopStyle: BorderStyleProp;
  borderBottomStyle: BorderStyleProp;
  borderXStyle: BorderStyleProp;
  borderYStyle: BorderStyleProp;
  // color
  borderColor: BorderColorProp<T>;
  borderLeftColor: BorderColorProp<T>;
  borderRightColor: BorderColorProp<T>;
  borderTopColor: BorderColorProp<T>;
  borderBottomColor: BorderColorProp<T>;
  borderXColor: BorderColorProp<T>;
  borderYColor: BorderColorProp<T>;
  // OUTLINE
  outline: OutlineWidthProp<T>;
  outlineWidth: OutlineWidthProp<T>;
  outlineStyle: C["outlineStyle"];
  outlineColor: P<T, "colors">;
  outlineOffset: C["outlineOffset"];
  // TRANSITION
  transition: C["transitionProperty"];
  transitionProperty: C["transitionProperty"];
  transitionDuration: C["transitionDuration"];
  transitionDelay: C["transitionDelay"];
  transitionTimingFunction: C["transitionTimingFunction"];
  // LISTS
  listStyleType: C["listStyleType"];
  listStylePosition: C["listStylePosition"];
  // TABLES
  borderCollapse: C["borderCollapse"];
  borderSpacing: C["borderSpacing"];
  tableLayout: C["tableLayout"];
  // HELPERS
  truncate: boolean;
  //
  opacity: C["opacity"];
  // TRANSFORM
  transform: C["transform"];
  transformOrigin: C["transformOrigin"];
  // INTERACTIVITY
  accentColor: P<T, "colors">;
  appearance: C["appearance"];
  caretColor: P<T, "colors">;
  cursor: C["cursor"];
  pointerEvents: C["pointerEvents"];
  resize: C["resize"];
  scrollBehavior: C["scrollBehavior"];
  userSelect: C["userSelect"];
  // SVG
  fill: P<T, "colors">;
  stroke: P<T, "colors">;
  strokeWidth: C["strokeWidth"];
}>;

export type CSSProps<Theme extends GenericTheme> = CSSPropsMediaQueries<Theme> &
  CSSPropsPseudoSelectors<Theme> &
  BaseCSSProps<Theme>;

export type CSSPropsMediaQueries<Theme extends GenericTheme> = Partial<
  Record<
    `$media:${Extract<keyof Theme["breakpoints"], string>}`,
    CSSPropsPseudoSelectors<Theme> & BaseCSSProps<Theme>
  >
>;

export type CSSPropsPseudoSelectors<Theme extends GenericTheme> =
  CSSPropsPseudoClasses<Theme> &
    CSSPropsPseudoElements<Theme> & {
      $dark?: BaseCSSProps<Theme>;
    };

export type CSSPropsPseudoClasses<Theme extends GenericTheme> = Partial<{
  $hover: BaseCSSProps<Theme>;
  $focus: BaseCSSProps<Theme>;
  $focusVisible: BaseCSSProps<Theme>;
  $focusWithin: BaseCSSProps<Theme>;
  $active: BaseCSSProps<Theme>;
  $visited: BaseCSSProps<Theme>;
  $target: BaseCSSProps<Theme>;
  $firstOfType: BaseCSSProps<Theme>;
  $lastOfType: BaseCSSProps<Theme>;
  $onlyOfType: BaseCSSProps<Theme>;
  $empty: BaseCSSProps<Theme>;
  $disabled?: BaseCSSProps<Theme>;
  $enabled: BaseCSSProps<Theme>;
  $checked: BaseCSSProps<Theme>;
  $indeterminate: BaseCSSProps<Theme>;
  $default: BaseCSSProps<Theme>;
  $required: BaseCSSProps<Theme>;
  $valid: BaseCSSProps<Theme>;
  $invalid: BaseCSSProps<Theme>;
  $inRange: BaseCSSProps<Theme>;
  $outOfRange: BaseCSSProps<Theme>;
  $placeholderShown: BaseCSSProps<Theme>;
  $autofill: BaseCSSProps<Theme>;
  $readOnly: BaseCSSProps<Theme>;
}>;

export type CSSPropsPseudoElements<Theme extends GenericTheme> = Partial<{
  $before: BaseCSSProps<Theme>;
  $after: BaseCSSProps<Theme>;
  $selection: BaseCSSProps<Theme>;
  $marker: BaseCSSProps<Theme>;
  $placeholder: BaseCSSProps<Theme>;
  $fileSelectorButton: BaseCSSProps<Theme>;
}>;

export type GenericTheme = Partial<{
  colors: Record<string, string>;
  spacing: Record<string, string | number>;
  fontFamily: Record<string, CSSObject["fontFamily"]>;
  fontSize: Record<string, CSSObject["fontSize"]>;
  fontWeight: Record<string, CSSObject["fontWeight"]>;
  lineHeight: Record<string, CSSObject["lineHeight"]>;
  borderWidth: Record<string, CSSObject["borderWidth"]>;
  borderRadius: Record<string, CSSObject["borderRadius"]>;
  breakpoints: Record<string, string>;
  zIndex: Record<string, CSSObject["zIndex"]>;
}>;

export type GenericVariants<Theme extends GenericTheme> = Record<
  string,
  Record<string, CSSProps<Theme>>
>;

export type VariantProps<Variants> = Partial<{
  [VariantGroup in keyof Variants]: keyof Variants[VariantGroup];
}>;

export type CSSProp<Theme extends GenericTheme> = {
  css?: Interpolation<{ theme: Theme } & { [key: string]: any }>;
};

export type TwyledProps<
  Theme extends GenericTheme,
  Variants
> = CSSProps<Theme> & VariantProps<Variants> & CSSProp<Theme>;

export type TwyledComponentProps<
  ElementType extends React.ElementType,
  Theme extends GenericTheme,
  Variants
> = React.ComponentPropsWithRef<ElementType> &
  TwyledProps<Theme, Variants> & { children?: React.ReactNode };

export type TwyledOptions<Theme extends GenericTheme, Variants> = Partial<{
  variants: Variants;
  defaultVariants: VariantProps<Variants>;
  defaults: CSSProps<Theme> & CSSProp<Theme>;
  displayName: string;
}>;

export type CreateTwyledOptions<Theme extends GenericTheme> = {
  theme: Theme;
};
