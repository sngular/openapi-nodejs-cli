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
};
