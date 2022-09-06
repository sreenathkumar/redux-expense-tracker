import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";

export default function Transactions() {
  const dispatch = useDispatch();

  const { transactions, isLoading, isError } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  // decide what to render
  const LastFiveElement = transactions
    .slice(Math.max(transactions.length - 5, 0))
    .reverse();

  let content = null;
  if (isLoading) content = <p>Loading ...</p>;

  if (!isLoading && isError)
    content = <p className="error">There was an error occured</p>;

  if (!isLoading && !isError && transactions?.length > 0) {
    content = LastFiveElement.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  }

  if (!isLoading && !isError && transactions?.length === 0) {
    content = <p>No transactions found!</p>;
  }

  return (
    <>
      <p className="second_heading">Recent Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
      <Link to="/transactions">All Transactions</Link>
    </>
  );
}
