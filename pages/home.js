import React, { useContext } from "react";
import UserContext from "./context/userContext";
import Card from "../components/card";
import IncomeCard from "../components/incomeCard";
import ExpenseCard from "../components/expenseCard";

export default function Home() {
  const a = useContext(UserContext);

  if (a.user) {
    return <><Card/><IncomeCard/><ExpenseCard/></>;
  }

}
