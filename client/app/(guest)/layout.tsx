"use client"

import { useStoreState } from 'easy-peasy'
import { redirect } from 'next/navigation'

const layout = ({children}: {children: React.ReactNode}) => {
  const {isAuth} = useStoreState((state: any) => state.auth)
  if(isAuth){
    redirect('/')
  }
  return children;
}

export default layout