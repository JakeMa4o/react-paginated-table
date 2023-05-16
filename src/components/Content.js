import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateDnD } from '../features/quotes/quotesSlice';

const Content = () => {
    const dispatch = useDispatch();
    const { data, currentPage, quotesPerPage } = useSelector((store) => store.quotes);
    const lastIndexForPage = currentPage * quotesPerPage;
    const firstIndexForPage = lastIndexForPage - quotesPerPage;
    const records = data.slice(firstIndexForPage, lastIndexForPage);
    
    

    function handleOnDragEnd (result) {
        const {destination, source} = result;
        if (!destination) return;

        dispatch(updateDnD({data, destination, source}));
    }

    return (
        <div className='content'>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Symbol</th>
                        <th>Total Volume</th>
                        <th>Market cap</th>
                        <th>Latest change</th>
                        <th>Change percent</th>
                        <th>LatestTime</th>
                    </tr>
                </thead>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='quotes'>
                        {(provided) => (
                            <tbody {...provided.droppableProps} ref={provided.innerRef}>
                                {records.map(({ quote }, i) => {
                                    return (
                                        <Draggable key={i} draggableId={i.toString()} index={i}>
                                            {(provided) => (
                                                <tr className='quote' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <td className='company-name'>{quote.companyName}</td>
                                                    <td className='symbol'>{quote.symbol}</td>
                                                    <td>{quote.avgTotalVolume.toLocaleString()}</td>
                                                    <td><span className='dollar-sign'>$</span>{quote.marketCap.toLocaleString("en-US")}</td>
                                                    <td className={quote.change < 0 ? "negative" : "positive"}>{quote.change}</td>
                                                    <td className={quote.changePercent < 0 ? "negative" : "positive"}>{(quote.changePercent * 100).toFixed(2)}%</td>
                                                    <td>{quote.latestTime}</td>
                                                </tr>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </tbody>
                        )}
                    </Droppable>
                </DragDropContext>
            </table>
        </div>
    )
}

export default Content