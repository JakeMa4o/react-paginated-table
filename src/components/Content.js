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
                        <th>avgTotalVolume</th>
                        <th>calculationPrice</th>
                        <th>avgTotalVolume</th>
                        <th>id</th>
                        <th>currency</th>
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
                                                <tr {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <td>{quote.avgTotalVolume}</td>
                                                    <td>{quote.calculationPrice}</td>
                                                    <td>{quote.avgTotalVolume}</td>
                                                    <td>{quote.id}</td>
                                                    <td>{quote.currency}</td>
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