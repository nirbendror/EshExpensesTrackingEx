import { colorScheme } from "./App";

export const BACKGROUND_COLOR = colorScheme === 'dark' ? 'black' : 'white';

export const dateToString = (date: Date) => {
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
}

export const stringToDate = (date: string) => {
    const [day, month, year] = date.split('.')
    return new Date(parseInt(year), parseInt(month), parseInt(day))
}
