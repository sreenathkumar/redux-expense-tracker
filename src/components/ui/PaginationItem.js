import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paginate } from '../../features/pagination/paginationSlice';

export default function PaginationItem({ number, setActivePage }) {
    const dispatch = useDispatch();
    const activePage = useSelector((state) => state.pagination.pageNumber);

    let bgColor = 'bg-blue-600';
    if (number === activePage) {
        bgColor = 'bg-indigo-500';
    }

    return (
        <div
            className={`text-white px-4 py-1 rounded-full cursor-pointer ml-1 ${bgColor}`}
            onClick={(e) => {
                let allElement = [...e.target.parentElement.children];
                allElement.forEach((element) => {
                    element.classList.remove('bg-indigo-500');
                });
                dispatch(paginate(number));
                e.target.classList.add('bg-indigo-500');
            }}
        >
            {number}
        </div>
    );
}
