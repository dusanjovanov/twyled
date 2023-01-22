import { propMap } from "./propMaps";
import {
  camelToKebab,
  isCSSProp,
  isMediaQueryProp,
  isPseudoElementProp,
  isPseudoSelectorProp,
} from "./utils";

export const createPropsToCSSObject = (theme: any) => {
  const propsToCSSObject = (props: any) => {
    let cssObject = {};
    const entries = Object.entries(props);
    for (let i = 0; i < entries.length; i++) {
      const [prop, value] = entries[i] as any;
      if (!isCSSProp(prop)) continue;

      if (prop === "$dark") {
        cssObject[".dark &"] = propsToCSSObject(value);
        continue;
      }
      //
      else if (isMediaQueryProp(prop)) {
        const bpSlot = prop.split(":")[1];
        const bpValue = theme.breakpoints[bpSlot];
        if (!bpValue) continue;
        cssObject[`@media (min-width:${bpValue})`] = propsToCSSObject(value);
        continue;
      }
      //
      else if (isPseudoSelectorProp(prop)) {
        let pseudoClass = "&:";
        if (isPseudoElementProp(prop)) {
          pseudoClass += ":";
        }
        pseudoClass += camelToKebab(prop.slice(1));
        cssObject[pseudoClass] = propsToCSSObject(value);
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
