import Content from './Content';
import Navigation from './Navigation';

const Table = () => {
    return (
        <div className='table'>
            <h1><span className='golden-stock'>Stock</span> Quotes</h1>
            <Content />
            <Navigation />
        </div>
    )
}

export default Table