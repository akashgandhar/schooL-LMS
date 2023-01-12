import React, { useContext } from "react";
import Card from "../components/card";
import IncomeCard from "../components/incomeCard";
import ExpenseCard from "../components/expenseCard";
import UserContext from "../components/context/userContext";

export default function Home() {
  const a = useContext(UserContext);

  if (a.user) {
    return <><Card/><IncomeCard/><ExpenseCard/></>;
  }

}
