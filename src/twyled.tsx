import { keyframes as emotionKeyframes } from "@emotion/react";
import styled from "@emotion/styled";
import deepMerge from "deepmerge";
import React from "react";
import { defaultTheme, GenericTheme } from "./defaultTheme";
import { propMap, pseudoSelectorsMap } from "./propMaps";
import { createPropsToCSSObject } from "./propsToCSS";
import { CSSProps, Theme as MergedTheme } from "./types";
import { isMediaQueryProp } from "./utils";

const propsToSkip = {
  as: 1,
  theme: 1,
};

type GenericVariants<Theme extends GenericTheme> = Record<
  string,
  Record<string, CSSProps<MergedTheme<Theme>>>
>;

type VariantProps<
  Theme extends GenericTheme,
  Variants extends GenericVariants<Theme>
> = Omit<
  Partial<{
    [VariantGroup in keyof Variants]: keyof Variants[VariantGroup];
  }>,
  "children"
>;

type TwyledProps<
  Theme extends GenericTheme,
  Variants extends GenericVariants<Theme>
> = CSSProps<MergedTheme<Theme>> & VariantProps<Theme, Variants>;

type TwyledComponentProps<
  ElementType extends React.ElementType,
  Theme extends GenericTheme,
  Variants extends GenericVariants<Theme>
> = React.ComponentPropsWithRef<ElementType> & TwyledProps<Theme, Variants>;

type TwyledOptions<
  Theme extends GenericTheme,
  Variants extends GenericVariants<Theme>
> = Partial<{
  variants: Variants;
  defaultVariants: VariantProps<Theme, Variants>;
  defaults: CSSProps<MergedTheme<Theme>>;
  displayName: string;
}>;

const createShouldForwardProp = (variants) => (prop) =>
  !propMap[prop] &&
  !pseudoSelectorsMap[prop] &&
  !propsToSkip[prop] &&
  !isMediaQueryProp(prop) &&
  !variants[prop];

export const createTwyled = <Theme extends GenericTheme>(theme: Theme) => {
  const t = deepMerge(defaultTheme, theme);

  const keyframes = {};
  for (const [name, keyframe] of Object.entries(t.keyframes)) {
    keyframes[name] = emotionKeyframes(keyframe as any);
  }

  const twyled = <
    ElementType extends React.ElementType,
    Variants extends GenericVariants<MergedTheme<Theme>> = {}
  >(
    elementType: ElementType,
    options?: TwyledOptions<Theme, Variants>
  ) => {
    const {
      variants = {},
      defaultVariants = {},
      defaults = {},
    } = options ?? {
      variants: {},
      defaultVariants: {},
      defaults: {},
    };
    const shouldForwardProp = createShouldForwardProp(variants);

    const createStyled = styled(elementType as any, {
      shouldForwardProp,
    });
    let StyledComponent = elementType as any;

    if (!(elementType as any).__twyled) {
      StyledComponent = createStyled((p) => {
        const propsToCSSObject = createPropsToCSSObject(t);
        return propsToCSSObject(p);
      });
    }

    const TwyledComponent = React.forwardRef((props, ref) => {
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

      return (
        <StyledComponent {...defaults} {...variantProps} {...props} ref={ref} />
      );
    }) as React.ForwardRefExoticComponent<
      TwyledComponentProps<ElementType, MergedTheme<Theme>, Variants>
    >;

    TwyledComponent.displayName = "TwyledComponent";
    (TwyledComponent as any).__twyled = 1;

    return TwyledComponent;
  };

  return {
    twyled,
  };
};
