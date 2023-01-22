import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import styled, { StyledComponent } from "@emotion/styled";
import React from "react";
import { createPropsToCSSObject } from "./propsToCSS";
import {
  CreateTwyledOptions,
  GenericTheme,
  GenericVariants,
  TwyledComponentProps,
  TwyledOptions,
} from "./types";
import { createShouldForwardProp } from "./utils";

export const createTwyled = <Theme extends GenericTheme>({
  theme,
}: CreateTwyledOptions<Theme>) => {
  const twyled = <ElementType extends React.ElementType, Variants>(
    elementType: ElementType,
    options?: TwyledOptions<Theme, Variants>
  ) => {
    const {
      variants = {},
      defaultVariants = {},
      defaults = { css: {} },
    } = options ?? { css: {} };
    const shouldForwardProp = createShouldForwardProp(variants);

    const createStyled = styled(elementType as any, {
      shouldForwardProp,
    });

    const propsToCSSObject = createPropsToCSSObject(theme);

    const variantKeys = Object.keys(variants);

    const TwyledComponent = createStyled((props) => {
      const variantPropsWithDefaults = {
        ...defaultVariants,
        ...props,
      };

      let variantCSSProps = {};

      for (const variantKey of variantKeys) {
        if (variantKey in variantPropsWithDefaults) {
          const variantGroup = variants[variantKey];
          const appliedVariantKey = variantPropsWithDefaults[variantKey];

          variantCSSProps = {
            ...variantCSSProps,
            ...variantGroup[appliedVariantKey],
          };
        }
      }

      const cssFromProps = propsToCSSObject({
        ...defaults,
        ...variantCSSProps,
        ...props,
      });

      return [defaults.css, cssFromProps, props.css];
    });

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

  const ThemeProvider = (props: { children: React.ReactNode }) => {
    return React.createElement(EmotionThemeProvider, { ...props, theme });
  };

  return {
    twyled,
    createVariants,
    ThemeProvider,
  };
};

export const createTheme = <Theme extends GenericTheme>(theme: Theme) => theme;
