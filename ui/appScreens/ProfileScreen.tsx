import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ExpensesContext } from '../../providers/ExpensesProvider'
import { UserContext } from '../../providers/UserProvider'
import { StorageItems, useStorageItem } from '../../storage/localStorage'
import { Separator } from '../UIComponents/UILab'
import { BACKGROUND_COLOR } from '../../const'

const ProfileScreen: React.FC = () => {
  const [localExpenses, setLocalExpenses] = useStorageItem(StorageItems.expenses)
  const { userName, handleLogout} = useContext(UserContext)
  const { expenses } = useContext(ExpensesContext)

  const onLogout = () => {
    setLocalExpenses(JSON.stringify([]))
    handleLogout()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.userNameTitle}>Hi {userName},</Text>
      <View style={{paddingTop: '40%'}}>
        <View style={styles.expensessItemsContainer}>
          <Text style={styles.expensessItemsText}>Total Expensess Items</Text>
          <Text style={styles.expensessItemsAmount}>{expenses.length}</Text>
        </View>

        <Separator/>

        <TouchableOpacity style={styles.sigoutButton} onPress={onLogout}>
          <Text style={styles.expensessItemsText}>Sign Out</Text>
        </TouchableOpacity>

        <Separator/>
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column', 
    backgroundColor: BACKGROUND_COLOR
  },
  expensessItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal:15,
    paddingBottom: 10
  },
  expensessItemsText: {
    fontSize: 22,
    color: 'black'
  },
  expensessItemsAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black'
  },
  userNameTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingLeft: 10,
    paddingBottom: 50,
    paddingTop: 10
  },
  sigoutButton: {
    paddingHorizontal:15,
    paddingTop: 30,
    paddingBottom: 10
  }
})
