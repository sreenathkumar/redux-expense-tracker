import PaginationItem from "./PaginationItem";
import { useSelector } from "react-redux";

export default function Pagination() {
  const { itemsPerPage, totalTransactions } = useSelector((state) => {
    return state.pagination;
  });
  const NumberOfPages = Math.ceil(totalTransactions / itemsPerPage);
  let pageArray = [];
  for (let i = 1; i <= NumberOfPages; i++) {
    pageArray.push(i);
  }
  return (
    <section className="pt-12">
      <div className="container flex flex-row pagination">
        {pageArray.map((number) => {
          return <PaginationItem key={number} number={number} />;
        })}
      </div>
    </section>
  );
}
