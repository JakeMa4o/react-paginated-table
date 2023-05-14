import { useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import { getQuotes } from './features/quotes/quotesSlice';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.quotes)

  useEffect(() => {
    dispatch(getQuotes())
  }, [])


  
  if (isLoading) {
    return <div className='loading'>
      <h1>Loading...</h1>
    </div>
  }

  return (
    <div className="App">
      <Table />
    </div>
  );
}

export default App;
