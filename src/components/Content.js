import { useSelector } from 'react-redux';

const Content = () => {
    const {data, currentPage, quotesPerPage} = useSelector((store) => store.quotes);
    const lastIndexForPage = currentPage * quotesPerPage;
    const firstIndexForPage = lastIndexForPage - quotesPerPage;
    const records = data.slice(firstIndexForPage, lastIndexForPage);

    return (
        <div className='content'>
            <table>
                <thead>
                    <tr>
                        <th>avgTotalVolume</th>
                        <th>calculationPrice</th>
                        <th>avgTotalVolume</th>
                        <th>high</th>
                        <th>currency</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, i) => {
                        return (
                            <tr key={i}>
                                <td>{record.quote.avgTotalVolume}</td>
                                <td>{record.quote.calculationPrice}</td>
                                <td>{record.quote.avgTotalVolume}</td>
                                <td>{record.quote.high}</td>
                                <td>{record.quote.currency}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Content