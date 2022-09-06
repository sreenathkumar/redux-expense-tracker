import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilteredTransactions,
  filterRemoved,
  filterSelected,
  searched,
} from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";
import { Link } from "react-router-dom";
import Pagination from "../ui/Pagination";
import { fetchTotalTransactions } from "../../features/pagination/paginationSlice";

const TotalTransactions = () => {
  const dispatch = useDispatch();

  const { transactions, isLoading, isError, filterType, search } = useSelector(
    (state) => state.transaction
  );

  const [searchInput, setSearchInput] = useState(search);

  const { start, end } = useSelector((state) => state.pagination);
  useEffect(() => {
    dispatch(fetchTotalTransactions());
    dispatch(fetchFilteredTransactions({ search, filterType, start, end }));
  }, [dispatch, start, end, filterType, search]);

  // decide what to render
  // const LastFiveElement = transactions.slice(Math.max(transactions.length - 5, 0)).reverse();

  let content = null;
  if (isLoading) content = <p>Loading ...</p>;

  if (!isLoading && isError)
    content = <p className="error">There was an error occured</p>;

  if (!isLoading && !isError && transactions?.length > 0) {
    content = transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  }

  if (!isLoading && !isError && transactions?.length === 0) {
    content = <p>No transactions found!</p>;
  }
  const handleFilter = (e) => {
    const selectedType = e.target.innerHTML.toLowerCase();
    if (selectedType === filterType) {
      dispatch(filterRemoved());
    } else {
      dispatch(filterSelected(selectedType));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searched(searchInput));
  };

  return (
    <>
      <div className="filter-container">
        <span
          className={`filter-item ${filterType === "income" && "active"}`}
          onClick={handleFilter}
        >
          Income
        </span>
        <span
          className={`filter-item ${filterType === "expense" && "active"}`}
          onClick={handleFilter}
        >
          Expense
        </span>
        <form onSubmit={handleSubmit}>
          <input
            type=""
            className="search-field"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
      </div>
      <p className="second_heading">Your Transactions:</p>
      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
      <Pagination />
      <button>
        <Link
          to="/"
          onClick={() => {
            dispatch(filterRemoved());
          }}
        >
          Home
        </Link>
      </button>
    </>
  );
};

export default TotalTransactions;
