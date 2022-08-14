import React, { useCallback, useMemo } from "react";
import ReactPaginate from "react-paginate";

function Pagination({
    limit,
    offset,
    total,
    setLimit,
    setOffset,
}: {
    limit: number;
    offset: number;
    total: number;
    setLimit: Function;
    setOffset: Function;
}) {
    const pageCount = useMemo(() => {
        return Math.ceil(total / limit);
    }, [total, limit]);

    const handlePageClick = useCallback((event: { selected: number }) => {
      console.log(event.selected, limit, total)
        const newOffset = (event.selected * limit) % total;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setOffset(newOffset);
    }, [limit, total]);

    return (
        <ReactPaginate
            className="pagination-wrap hstack gap-2 pagination listjs-pagination"
            breakLabel="..."
            nextLabel={<a className="page-item pagination-prev">Next</a>}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            activeClassName="active"
            pageLinkClassName="page"
            previousLabel={
                <a className="page-item pagination-prev">Previous</a>
            }
            // renderOnZeroPageCount={null}
        />
    );
}

export default Pagination;