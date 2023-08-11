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
            <div className='table'>
                <div className='thead'>
                    <div className='tr'>
                        <div className='th'></div>
                        <div className='th'>Symbol</div>
                        <div className='th'>Total Volume</div>
                        <div className='th'>Market cap</div>
                        <div className='th'>Latest change</div>
                        <div className='th'>Change percent</div>
                        <div className='th'>LatestTime</div>
                    </div>
                </div>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='quotes'>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className='tbody'>
                                {records.map(({ quote }, i) => {
                                    return (
                                        <Draggable key={i} draggableId={i.toString()} index={i}>
                                            {(provided) => (
                                                <div className='quote tr' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <div className='company_name td'>{quote.companyName}</div>
                                                    <div className='symbol td'>{quote.symbol}</div>
                                                    <div className='td'>{quote.avgTotalVolume.toLocaleString()}</div>
                                                    <div className='td'><span className='dollar-sign'>$</span>{quote.marketCap.toLocaleString("en-US")}</div>
                                                    <div className={quote.change < 0 ? "negative td" : "positive td"}>{quote.change}</div>
                                                    <div className={quote.changePercent < 0 ? "negative td" : "positive td"}>{(quote.changePercent * 100).toFixed(2)}%</div>
                                                    <div className='td'>{quote.latestTime}</div>
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )
}

export default Content