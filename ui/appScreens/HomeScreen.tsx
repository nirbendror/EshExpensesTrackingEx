import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Expense, RExpense } from '../../expenseModels/Expense';
import { ExpensesContext } from '../../providers/ExpensesProvider';
import { UserContext } from '../../providers/UserProvider';
import ExpenseModal from '../UIComponents/ExpenseModal';
import { Navigation } from '../navigation/AppNavigator';
import { BACKGROUND_COLOR } from '../../const';
import { AddExpenseButton, DateInfo, ExpenseItemRow, ExpensesInfo, FilterButton, Separator } from '../UIComponents/UILab';

const HomeScreen: React.FC<Navigation> = (props) => {
  const { userName } = useContext(UserContext)
  const { expenses, editExpense, removeExpense, addExpense, filterExpenses, groupedExpenses} = useContext(ExpensesContext)
  const [selectedExpenseItem, setSelectedExpenseItem] = useState<Expense | null>(null)
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [showFilterExpenses, setShowFilterExpenses] = useState(false)

  const onExpenseClick = (expense: Expense) => {
    setSelectedExpenseItem(expense)
  }

  const onAddExpenseButtonClick = () => {
    setSelectedExpenseItem(RExpense({userName}))
    setShowAddExpense(true)
  }

  const onFilterExpensesButtonClick = () => {
    setSelectedExpenseItem(RExpense({date: ''}))
    setShowFilterExpenses(true)
  }

  const onModalCancel = () => {
    setSelectedExpenseItem(null)
    setShowAddExpense(false)
    setShowFilterExpenses(false)
  }

  useEffect(() => {
    props.navigation.setOptions({ title: userName })
  }, [userName])

  const EditComponent = () => {
    return (
      <>
        {selectedExpenseItem && !showAddExpense && !showFilterExpenses && <ExpenseModal
          mode={'Edit'}
          visible={!!selectedExpenseItem}
          expense={selectedExpenseItem}
          onSave={editExpense}
          onCancel={onModalCancel}
          onDelete={removeExpense} 
        />}
      </>
  )}

    const AddComponent = () => {
      return (
        <>
          {selectedExpenseItem && showAddExpense && <ExpenseModal
          mode={'Add'}
          visible={!!selectedExpenseItem}
          expense={selectedExpenseItem}
          onSave={addExpense}
          onCancel={onModalCancel}
          />}
        </>
    )}

    const FilterComponent = () => {
      return (
        <>
          {selectedExpenseItem && showFilterExpenses && <ExpenseModal
            mode={'Filter'}
            visible={!!selectedExpenseItem}
            expense={selectedExpenseItem}
            onSave={filterExpenses}
            onCancel={onModalCancel}
          />}
        </>
    )}



  return (
    <>
      <View style={styles.viewContainer}>
        <View style={styles.HomeScreenContainer}>
          <ExpensesInfo expenses={expenses}/>
          <View style={{paddingTop:40}}>
            <FilterButton text='Filters' onPress={onFilterExpensesButtonClick} icon='☰'/>
          </View>
        </View>
        <ScrollView style={styles.viewContainer}>

          {groupedExpenses.map((groupedExpense) => {
            return (
             <View key={`group_${groupedExpense[0]}`}>
               <DateInfo key={groupedExpense[0]} date={groupedExpense[0]}/>
               {groupedExpense[1].map((expense) => {
                 return (
                  <View>
                    <ExpenseItemRow key={expense.id} expense={expense} onClick={onExpenseClick} />
                    <Separator />
                  </View>
                 )
               })}
             </View>
             
            )
          })}
        </ScrollView>

        <EditComponent />
        <AddComponent />
        <FilterComponent />
      </View>

      <View style={styles.addExpense}>
          <AddExpenseButton text={'+'} onPress={onAddExpenseButtonClick} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1, 
    backgroundColor: BACKGROUND_COLOR
  },
  HomeScreenContainer: {
    padding: 10, 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  addExpense: {
    flex:1, 
    position: 'absolute', 
    alignSelf: 'center', 
    padding: 10, 
    bottom: 0
  }
})

export default HomeScreen