import { propMap, pseudoSelectorsMap } from "./propMaps";
import { isCSSProp, isMediaQueryProp } from "./utils";

const pseudoSelectors = Object.keys(pseudoSelectorsMap);

export const createPropsToCSSObject = (theme: any) => {
  const propsToCSSObject = (props: any) => {
    let cssObject = {};
    const entries = Object.entries(props);
    for (let i = 0; i < entries.length; i++) {
      const [prop, value] = entries[i] as any;
      if (!isCSSProp(prop)) continue;

      // media queries
      if (isMediaQueryProp(prop)) {
        const bpSlot = prop.split(":")[1];
        const bpValue = theme.breakPoints[bpSlot];
        if (!bpValue) continue;
        cssObject[`@media (min-width:${bpValue})`] = propsToCSSObject(value);
        continue;
      }
      // pseudo selectors
      else if (pseudoSelectors.includes(prop)) {
        for (const ps of pseudoSelectors) {
          if (props[ps]) {
            cssObject[pseudoSelectorsMap[ps]] = propsToCSSObject(props[ps]);
          }
        }
        continue;
      }
      //
      else {
        const propFn = propMap[prop];

        if (propFn === 1) {
          cssObject = {
            ...cssObject,
            [prop]: value,
          };
        }
        //
        else {
          cssObject = {
            ...cssObject,
            ...propFn(value, theme),
          };
        }
      }
    }
    return cssObject;
  };
  return propsToCSSObject;
};
