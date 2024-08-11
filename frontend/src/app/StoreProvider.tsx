'use client'

import React, { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStore } from '@/lib/store'
import createStore from '@/lib/store'
import { setBooks } from '@/lib/store/features/books/bookSlice'

function StoreProvider({children}:{children: ReactNode}) {

  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = createStore()
    //for set initial data 
    // storeRef.current.dispatch(setBooks([]))
  }

  return ( 
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  )
}

export default StoreProvider
