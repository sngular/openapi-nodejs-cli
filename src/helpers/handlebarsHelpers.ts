import Handlebars from "handlebars";

export const setHandlebarsHelpers = () => {
  Handlebars.registerHelper(
    "includes",
    (array: any[], element: any): boolean => {
      return array.includes(element);
    }
  );

  Handlebars.registerHelper("capitalize", (text: string): string => {
    const characters = text.split("");
    characters[0] = characters[0].toUpperCase();
    return characters.join("");
  });

  Handlebars.registerHelper("removeSymbol", (text: string): string => {
    return text.replaceAll(/[^a-z]+/gim, "");
  });

  Handlebars.registerHelper("getType", (item: string | string[]): string => {
    if (Array.isArray(item)) {
      return item.join(" | ");
    }
    return item;
  });
};
