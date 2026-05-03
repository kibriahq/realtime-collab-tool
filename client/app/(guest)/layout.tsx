"use client"

import { Store } from '@/store'
import { useStoreState } from 'easy-peasy'
import { redirect } from 'next/navigation'

const layout = ({children}: {children: React.ReactNode}) => {
  const {isAuth} = useStoreState((state: Store) => state.auth)
  if(isAuth){
    redirect('/')
  }
  return children;
}

export default layout