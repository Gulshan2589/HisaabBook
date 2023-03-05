//import progress from antd
import { Progress } from "antd";
import React from "react";
import "./analatics.css";

//Analatics function with pros 
function Analatics({ transactions }) {
  // Count the total number of transactions
  const totalTransactions = transactions.length;

  // Get all income transactions
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "Income"
  );

  // Get all expense transactions
  const totalExpenceTransactions = transactions.filter(
    (transaction) => transaction.type === "Expense"
  );

  // Calculate the percentage of income and expense transactions
  const totalIncomeTransactionsPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpenceTransactionsPercentage =
    (totalExpenceTransactions.length / totalTransactions) * 100;

  // Calculate the total turnover (sum of all transaction amounts)
  const totalTurnover = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  // Calculate the total income turnover (sum of all income transaction amounts)
  const totalIncomeTurnover = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // Calculate the total expense turnover (sum of all expense transaction amounts)
  const totalExpenceTurnover = transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // Calculate the percentage of income and expense turnover
  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenceTurnoverPercentage =
    (totalExpenceTurnover / totalTurnover) * 100;

  //create array of categories
  const categories = [
    "Business", "Investments", "Extra income", "Deposits", "Lottery",
    "Gifts", "Salary", "Savings", "Rental income", "Bills", "Car",
    "Clothes", "Travel", "Food", "Shopping", "House", "Entertainment",
    "Phone", "Pets", "Other",
  ];

  // Rendering the analytics data to the page
  return (
    <div className="analytics">
      <div className="row">
        <div className="totaltran-col">
          <div className="transactions-count">
            <h4>Total Transactions : {totalTransactions}</h4>
            <hr />
            <h5>Income : {totalIncomeTransactions.length}</h5>
            <h5>Expence : {totalExpenceTransactions.length}</h5>
            {/* Rendering progress bars for income and expense transactions */}
            <div className="progress-bars">
              <Progress
                className="progress-element-trans"
                strokeColor="#5DD64F"
                type="circle"
                percent={totalIncomeTransactionsPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="#E5572F"
                type="circle"
                percent={totalExpenceTransactionsPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>

        <div className="totalturn-col">
          <div className="transactions-count">
            <h4>Total Turnover : {totalTurnover}</h4>
            <hr />
            <h5 >Income : {totalIncomeTurnover}</h5>
            <h5>Expence : {totalExpenceTurnover}</h5>
            {/* Rendering progress bars for income and expense turnover */}
            <div className="progress-bars">
              <Progress
                className="progress-element"
                strokeColor="#5DD64F"
                type="circle"
                percent={totalIncomeTurnoverPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="#E5572F"
                type="circle"
                percent={totalExpenceTurnoverPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        {/* We start by rendering a parent div with a class of "category-col". */}
        <div className="category-col">
          <div className="category-analysis">
            <h4 style={{ color: '#5dd64f' }}>Income - Category Wise</h4>
            {/* We then map through an array of categories using the 
            `map` function, and for each category: */}
            {categories.map((category) => {
              //  We filter the transactions array to include only 
              // "Income" transactions of that category
              const amount = transactions
                .filter((t) => t.type === "Income" && t.category === category)
                // We calculate the total amount of income transactions 
                //in that category using the reduce function.
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && <div className="category-card">
                  <h5 style={{ color: '#5dd64f' }}>{category}</h5>
                  {/* Render a Progress bar with a blue color stroke, and display 
                  the percentage of the total income turnover for that category. */}
                  <Progress strokeColor='#0B5AD9'
                    percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="category-col">
          <div className="category-analysis">
            <h4 style={{ color: '#e5572f' }}>Expence - Category Wise</h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === "Expense" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && <div className="category-card">
                  <h5 style={{ color: '#e5572f' }}>{category}</h5>
                  <Progress strokeColor='#009cea'
                    percent={((amount / totalExpenceTurnover) * 100).toFixed(0)} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analatics;
