
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, TextInput} from 'react-native';
import { Expense } from '../../expenseModels/Expense';

// Interfaces:
interface CustomButtonProps {
    text: string
    disabled?: boolean
    icon?: string,
    onPress: () => void
}

interface ExpenseItemProps {
    expense: Expense,
    onClick: (expense: Expense) => void
}

interface ExpenseModalProps {
    text: string
    value: string
    onChange: (title: string) => void
}

// Buttons:
export const CustomButton = (props: CustomButtonProps) => {
    const buttonColor = props.disabled ? '#C3C3C3' : '#5E57AC';
    return (
        <View style={styles.customButtonView}>
            <TouchableOpacity 
                disabled={props.disabled}
                style={[styles.customButtonContainer, {backgroundColor: buttonColor}]}
                onPress={props.onPress}>
                <Text style={styles.customButtonText}>{props.text}</Text>
            </TouchableOpacity >
        </View>
    )
}

export const FilterButton = (props: CustomButtonProps) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.filterButton}>
            {props.icon && <View style={styles.filterIconContainer}>
                <Text>{props.icon}</Text>
            </View>}
            <Text style={styles.filterText}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export const AddExpenseButton = (props: CustomButtonProps) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
            <TouchableOpacity style={styles.addExpenseContainer} onPress={props.onPress}>
                <Text style={styles.addExpenseText}>{props.text}</Text>
            </TouchableOpacity >
        </View>
    )
}

export const CloseModalButton = (props: {onClick: () => void}) => {
    return (
        <TouchableOpacity onPress={props.onClick} style={styles.closeModalButton}>
            <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
    )
}


export const ExpenseItemRow: React.FC<ExpenseItemProps> = ({expense, onClick}) => {
    const onExpenseClick = () => {
        onClick(expense)
    }

    return (
        <TouchableOpacity onPress={onExpenseClick}>
            <View style={styles.expenseItemContainer}>
                <Text style={styles.expenseItemText}>{expense.title}</Text>
                <Text style={styles.expenseItemTotalAmmount}>{`${expense.amount} $`}</Text>
            </View>
        </TouchableOpacity>
    )
}

// Seperate line
export const Separator = () => {
    return (
        <View style={styles.separator}/>
    )
}

// Custom input component
export const ExpenseModalInput = (props:ExpenseModalProps ) => {
    return (
        <View>
            <TextInput
                style={styles.expenseModalInput}
                placeholder={props.text}
                placeholderTextColor={'gray'}
                value={props.value}
                onChangeText={props.onChange}
                />
            <Separator/>
        </View>

    )
}
// Component for view and texts.
export const ExpensesInfo: React.FC<{ expenses: Expense[] }> = ({expenses}) => {
    const expenseseAmount = expenses.reduce((accumulator: number, current: Expense) => {
        return accumulator + current.amount
    }, 0)

    return (
        <View style={styles.expenseSInfoContainer}>
            <Text style={styles.expenseTitle}>{'Total Expenses:'}</Text>
            <Text style={styles.expensesTotalAmmount}>{`${expenseseAmount.toFixed(2)}`}</Text>
        </View>
    )
}


export const DateInfo: React.FC<{ date: string }> = ({date}) => {
    return (
        <View style={styles.dateContainer}>
            <Text style={styles.dateTitle}>{date}</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    customButtonView: { 
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        top: '40%'
    },  
    customButtonContainer: {
        justifyContent: 'center',
        height: 60,
        backgroundColor: '#5E57AC',
        borderRadius: 30,
        paddingHorizontal: 70,
        flexWrap: 'wrap'
    },
    customButtonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    expenseSInfoContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        paddingVertical: 8,
    },
    expenseTitle: {
        paddingEnd: 10,
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black'
    },
    expensesTotalAmmount: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black'
    },
    expenseItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    expenseItemText: {
        justifyContent: 'center',
        fontSize: 18,
        color: 'black'
    },
    expenseItemTotalAmmount: {
        fontSize: 18,
        textAlign: 'center',
        color: 'black'
    },
    filterButton: {
        flexDirection: 'row',
        backgroundColor: '#C3C3C3',
        borderRadius: 30,
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: 94,
        height: 35,
        alignItems: 'center',
    },
    filterIconContainer: {
        backgroundColor: '#888888',
        borderRadius: 50,
        marginRight: 5,
        padding: 5,
    },
    filterText: {
        color: 'black',
        fontWeight: 'bold',
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#D3D3D3'
    },
    dateTitle: {
        color: 'black',
        padding: 5,
        fontSize: 16,
    },
    separator: {
        borderBottomColor: '#444444',
        borderBottomWidth: 1,
        
    },
    addExpenseContainer: {
        justifyContent: 'center',
        backgroundColor: '#007FFF',
        width: 70,
        height: 70,
        borderRadius: 100,
    },
    addExpenseText: {
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
    },
    closeModalButton: {
        alignSelf: 'flex-end', 
        padding: 5,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    expenseModalInput: {
        borderWidth: 0,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        color: 'black'
      },
})