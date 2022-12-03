import React from "react";

const Paginate = (props) => {
  const nextIcon = ">";
  const prevIcon = "<";
  let numberOfPage = Math.ceil(props.products.length / 5);

  const paginate = () => {
    const page = [];
    for (let i = 0; i < numberOfPage; i++) {
      page.push(
        <button
          onClick={() => props.changePage(i)}
          disabled={props.currentPage === i}
          className={
            props.currentPage === i
              ? "border-[1px] border-red-900 px-2 py-0.5 bg-cyan-500 cursor-not-allowed"
              : "border-[1px] border-red-900 px-2 py-0.5 hover:bg-cyan-500"
          }
        >
          {i + 1}
        </button>
      );
    }
    return page;
  };

  return (
    <div className="mt-3">
      <button
        onClick={() => props.prevPage()}
        disabled={props.currentPage === numberOfPage - numberOfPage}
        className={
          props.currentPage === numberOfPage - numberOfPage
            ? "border-[1px] border-red-900 px-2 py-0.5 cursor-not-allowed"
            : "border-[1px] border-red-900 px-2 py-0.5 hover:bg-cyan-500"
        }
      >
        {prevIcon}
      </button>
      {paginate()}
      <button
        onClick={() => props.nextPage()}
        disabled={props.currentPage === numberOfPage - 1}
        className={
          props.currentPage === numberOfPage - 1
            ? "border-[1px] border-red-900 px-2 py-0.5 cursor-not-allowed"
            : "border-[1px] border-red-900 px-2 py-0.5 hover:bg-cyan-500"
        }
      >
        {nextIcon}
      </button>
    </div>
  );
};

export default Paginate;
