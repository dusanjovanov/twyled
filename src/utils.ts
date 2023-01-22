import { propMap, pseudoClassesMap, pseudoElementsMap } from "./propMaps";

export const isMediaQueryProp = (prop: string) => prop.indexOf("$media:") === 0;

export const isPseudoClassProp = (prop: string) => !!pseudoClassesMap[prop];

export const isPseudoElementProp = (prop: string) => !!pseudoElementsMap[prop];

export const isPseudoSelectorProp = (prop: string) =>
  isPseudoClassProp(prop) || isPseudoElementProp(prop);

export const isCSSProp = (prop: string) => {
  return (
    propMap[prop] ||
    isPseudoSelectorProp(prop) ||
    isMediaQueryProp(prop) ||
    prop === "$dark"
  );
};

export const camelToKebab = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

const propsToSkip = {
  as: 1,
  theme: 1,
  css: 1,
  $dark: 1,
};

export const createShouldForwardProp = (variants) => (prop) =>
  !isCSSProp(prop) && !propsToSkip[prop] && !variants[prop];
