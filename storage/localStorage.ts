import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

type StorageKeys = 'user' | 'expenses'

interface IStorageItem {
    key: StorageKeys
    defaultValue: string
}

export const StorageItems: { [key in StorageKeys]: IStorageItem } = {
    'user': {
        key: 'user',
        defaultValue: ''
    },
    'expenses': {
        key: 'expenses',
        defaultValue: '[]'
    }
}

export const useStorageItem = (item: IStorageItem): [string, (value: string) => Promise<void>] => {
    const [storedValue, setStoredValue] = useState(item.defaultValue)
    const { getItem, setItem } = useAsyncStorage(item.key)
    
    async function getStoredItem (key: string, defaultValue: string) {
      try {
        const item = await getItem()
        const value = item ?? defaultValue
        setStoredValue(value)
      } catch (error) {
        console.log(`Error get ${key} from asyncStorage: ${error}`)
      }
    }
  
    useEffect(() => {
      getStoredItem(item.key, item.defaultValue)
    }, [item.key, item.defaultValue]);
  
    const setValue = async (value: string) => {
      try {
          await setItem(value)
          setStoredValue(value)
      } catch (error) {
        console.log(`Error set ${item.key} to asyncStorage: ${error}`)
      }
    }
  
    return [storedValue, setValue]
}