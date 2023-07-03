import { Record } from "immutable";
import { dateToString } from "../const";

export interface Expense {
    id: string,
    userName: string,
    title: string,
    amount: number,
    date: string,
}

export const RExpense = Record<Expense>({
    id: '',
    title: '',
    userName: '',
    amount: 0,
    date: dateToString(new Date()),
})