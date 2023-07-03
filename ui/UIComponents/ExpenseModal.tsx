import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { Expense } from '../../expenseModels/Expense';
import uuid from 'react-native-uuid'
import { CustomButton, ExpenseModalInput, CloseModalButton } from './UILab';
import {Dimensions} from 'react-native';


export type ExpenseModalTypes = 'Add' | 'Edit' | 'Filter'
const WINDOW_WIDTH = Dimensions.get('window').width;

interface ExpenseModalProps {
    mode: ExpenseModalTypes,
    visible: boolean,
    expense: Expense,
    onSave: (expense: Expense) => void,
    onDelete?: (expense: Expense) => void,
    onCancel: () => void,
}

const ModalModes: { [key in ExpenseModalTypes]: string } = {
    'Add': 'Create Expense',
    'Edit': 'Edit Expense',
    'Filter': 'Filters',
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({mode, visible, expense, onSave, onDelete, onCancel}) => {
  const [title, setTitle] = useState(expense.title)
  const [amount, setAmount] = useState(expense.amount.toString())
  const [date, setDate] = useState(expense.date)
  const isDeleteButtonVisible = mode === 'Edit' 
  const saveButtonDisabled =  mode !== 'Filter' && (title.length === 0 || amount.length === 0)
  const modalFlex = mode === 'Filter'? 1 : 0

  const handleSave = () => {
    const newAmount = parseFloat(amount)
    const newId = mode === 'Add' ? uuid.v4().toString() : expense.id
    onSave({...expense, id: newId, title, amount: newAmount, date})
    onCancel()
  }

  const handleDelete = () => {
    onDelete?.(expense)
    onCancel()
  }

  return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onCancel}
      >
        <View style={[styles.modalContainer, {flex: modalFlex}]}>
          <View style={styles.modalContent}>

            <CloseModalButton onClick={onCancel}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20}}>
              <Text style={styles.modalTitle}>{ModalModes[mode]}</Text>
            </View>
              <ExpenseModalInput text={'Title'} value={title} onChange={setTitle} />
              <ExpenseModalInput text={'Amount'} value={amount} onChange={setAmount} />
              <ExpenseModalInput text={'Date'} value={date} onChange={setDate} />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 50}}>
                <CustomButton text={mode} onPress={handleSave} disabled={saveButtonDisabled} />
                {isDeleteButtonVisible&& <CustomButton text={'Delete'} onPress={handleDelete} disabled={saveButtonDisabled}/>}
            </View>
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom:40
  },
  modalTitle: {
    left: WINDOW_WIDTH*0.3,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
})

export default ExpenseModal
