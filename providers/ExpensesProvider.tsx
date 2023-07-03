import React, { createContext, useEffect, useState } from 'react';
import { StorageItems, useStorageItem } from '../storage/localStorage';
import { Expense, RExpense } from '../expenseModels/Expense';
import { stringToDate } from '../const';

export interface ExpensesContextProps {
    expenses: Expense[],
    groupedExpenses: [string, Expense[]][],
    addExpense: (expense: Expense) => void,
    removeExpense: (expense: Expense) => void,
    editExpense: (expense: Expense) => void,
    filterExpenses: (expense: Expense) => void,
}

const initialExpenseContext = {
    expenses: [],
    groupedExpenses: [],
    addExpense: () => {},
    removeExpense: () => {},
    editExpense: () => {},
    filterExpenses: () => {},
}

function groupExpensesByDate(Expenses: Expense[]): [string, Expense[]][] {
    const groupedExpenses = Expenses.reduce<[string, Expense[]][]>((accumulator, currentObject) => {
      const existingGroup = accumulator.find(([date]) => date === currentObject.date)
  
      if (existingGroup) {
        existingGroup[1].push(currentObject)
      } else {
        accumulator.push([currentObject.date, [currentObject]])
      }
  
      return accumulator
    }, [])
  
    groupedExpenses.sort((a, b) => stringToDate(b[0]).getTime() - stringToDate(a[0]).getTime())
  
    return groupedExpenses
  }

const ExpensesContext = createContext<ExpensesContextProps>(initialExpenseContext)

const ExpensesProvider = ({ children }) => {
    const [localExpenses, setLocalExpenses] = useStorageItem(StorageItems.expenses)
    const [expenses, setExpenses] = useState<Expense[]>([])

    const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([])
    const groupedExpenses = groupExpensesByDate(filteredExpenses)

    useEffect(() => {
        filterExpenses(RExpense({
            title: '',
            amount: 0,
            date: '',
        }))

    }, [expenses])

    useEffect(() => {
        setExpenses(JSON.parse(localExpenses))
    }, [localExpenses])

    const addExpense = (expense: Expense) => {
        const newExpenses = [...expenses, expense]
        setExpenses(newExpenses)
        setLocalExpenses(JSON.stringify(newExpenses))
    }

    const removeExpense = (expenseToRemove: Expense) => {
        const newExpenses = expenses.filter((expense) => expense.id !== expenseToRemove.id)
        setExpenses(newExpenses)
        setLocalExpenses(JSON.stringify(newExpenses))
    }

    const editExpense = (editedExpense: Expense) => {
        const newExpenses = expenses.map((expense) => {
            if(expense.id === editedExpense.id) {
                return editedExpense
            }
            return expense
        })
        setExpenses(newExpenses)
        setLocalExpenses(JSON.stringify(newExpenses))
    }

    const filterExpenses = (filterBy: Expense) => {
        const filtered = expenses.filter((expense) => {
            if(filterBy.title.length > 0 && !expense.title.includes(filterBy.title)) {
                return false
            }

            if(filterBy.amount > 0 && filterBy.amount !== expense.amount) {
                return false
            }

            if(filterBy.date.length > 0 && filterBy.date !== expense.date) {
                return false
            }

            return true
        })
        setFilteredExpenses(filtered)
    }

    const value = {
        expenses: filteredExpenses,
        groupedExpenses,
        addExpense,
        removeExpense,
        editExpense,
        filterExpenses,
    }

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}

export { ExpensesContext, ExpensesProvider }