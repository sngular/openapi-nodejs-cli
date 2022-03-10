import Handlebars from "handlebars";

export const setHandlebarsHelpers = () => {
    Handlebars.registerHelper('includes', (array: any[], element: any): boolean => {
        return array.includes(element)
    })
}
