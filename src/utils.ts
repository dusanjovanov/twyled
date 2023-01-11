import { propMap, pseudoSelectorsMap } from "./propMaps";

export const isMediaQueryProp = (prop: string) => prop.indexOf("$media:") === 0;

export const isCSSProp = (prop: string) => {
  return propMap[prop] || pseudoSelectorsMap[prop] || isMediaQueryProp(prop);
};
