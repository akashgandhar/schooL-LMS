import React, { useContext } from 'react'
import Card from '../components/card'
import IncomeCard from '../components/incomeCard'
import ExpenseCard from '../components/expenseCard'
import UserContext from '../components/context/userContext'

export default function Home() {
  const a = useContext(UserContext);

  <head></head>

  if (a.user) {
    return (
      <div className='bg-gray-200 '>
        <Card />
        <IncomeCard />
        <ExpenseCard />
      </div>
    )
  }
}
