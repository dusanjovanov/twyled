import { Interpolation } from "@emotion/react";
import styled, { StyledComponent } from "@emotion/styled";
import React from "react";
import { propMap, pseudoSelectorsMap } from "./propMaps";
import { createPropsToCSSObject } from "./propsToCSS";
import { CSSProps, GenericTheme } from "./types";
import { isMediaQueryProp } from "./utils";

const propsToSkip = {
  as: 1,
  theme: 1,
  css: 1,
};

type GenericVariants<Theme extends GenericTheme> = Record<
  string,
  Record<string, CSSProps<Theme>>
>;

type VariantProps<Variants> = Partial<{
  [VariantGroup in keyof Variants]: keyof Variants[VariantGroup];
}>;

type CSSProp = {
  css?: Interpolation<any>;
};

type TwyledProps<Theme extends GenericTheme, Variants> = CSSProps<Theme> &
  VariantProps<Variants> &
  CSSProp;

type TwyledComponentProps<
  ElementType extends React.ElementType,
  Theme extends GenericTheme,
  Variants
> = React.ComponentPropsWithRef<ElementType> &
  TwyledProps<Theme, Variants> & { children?: React.ReactNode };

type TwyledOptions<Theme extends GenericTheme, Variants> = Partial<{
  variants: Variants;
  defaultVariants: VariantProps<Variants>;
  defaults: CSSProps<Theme> & CSSProp;
  displayName: string;
}>;

const createShouldForwardProp = (variants) => (prop) =>
  !propMap[prop] &&
  !pseudoSelectorsMap[prop] &&
  !propsToSkip[prop] &&
  !isMediaQueryProp(prop) &&
  !variants[prop];

export const createTwyled = <Theme extends GenericTheme>(theme: Theme) => {
  // const keyframes = {};
  // for (const [name, keyframe] of Object.entries(theme.keyframes)) {
  //   keyframes[name] = emotionKeyframes(keyframe as any);
  // }

  const twyled = <ElementType extends React.ElementType, Variants>(
    elementType: ElementType,
    options?: TwyledOptions<Theme, Variants>
  ) => {
    const { variants = {}, defaultVariants = {}, defaults } = options ?? {};
    const shouldForwardProp = createShouldForwardProp(variants);

    const createStyled = styled(elementType as any, {
      shouldForwardProp,
    });

    const TwyledComponent = createStyled((props) => {
      const mergedProps = {
        ...defaultVariants,
        ...props,
      };

      let variantProps = {};
      for (const propKey of Object.keys(mergedProps)) {
        if (propKey in variants) {
          const variantGroup = variants[propKey];
          const propValue = mergedProps[propKey];

          variantProps = {
            ...variantProps,
            ...variantGroup[propValue],
          };
        }
      }

      const fromProps = propsToCSSObject({
        ...defaults,
        ...variantProps,
        ...props,
      });

      return {
        // @ts-expect-error
        ...defaults?.css,
        ...fromProps,
        ...props.css,
      };
    });

    const propsToCSSObject = createPropsToCSSObject(theme);

    TwyledComponent.displayName = options?.displayName ?? String(elementType);

    return TwyledComponent as StyledComponent<
      TwyledComponentProps<ElementType, Theme, Variants>
    >;
  };

  const createVariants = <Variants extends GenericVariants<Theme>>(
    variants: Variants
  ) => {
    return variants;
  };

  return {
    twyled,
    createVariants,
  };
};
