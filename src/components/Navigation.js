import { useDispatch, useSelector } from 'react-redux';
import { navigateToNext, navigateToPrev, changeCurrentPage } from '../features/quotes/quotesSlice';


const Navigation = () => {
    const dispatch = useDispatch();
    const {data, currentPage, quotesPerPage} = useSelector((store) => store.quotes);

    const numberOfPages = Math.ceil(data.length / quotesPerPage);
    const navigationNumbers = [...Array(numberOfPages + 1).keys()].slice(1);

    // Events

    function prevPage() {
        if (currentPage !== 1) {
            dispatch(navigateToPrev());
        }
    }

    function changePage(id) {
        dispatch(changeCurrentPage(id))
    }

    function nextPage() {
        if (currentPage !== numberOfPages) {
            dispatch(navigateToNext());
        }
    }


    return (
        <nav className='navigation'>
            <button onClick={() => prevPage()}>Prev</button>
            {navigationNumbers.map((n, i) => {
                return (
                    <button key={i} className={currentPage === n ? "active" : ""} onClick={() => changePage(n)}>
                        {n}
                    </button>
                )
            })}
            <button onClick={() => nextPage()}>Next</button>
        </nav>
    )
}

export default Navigation