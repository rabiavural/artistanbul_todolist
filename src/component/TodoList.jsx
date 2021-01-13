import moment from 'moment';
import { useEffect, useState } from 'react';
import { GroupingByDateData } from '../common/function';


var lengthControl = 0;
export function TodoList(props) {
    const [todoData, setTodoData] = useState({});

    useEffect(() => {
        if(props.todoList){
             if (props.todoList.length !== lengthControl) {
            lengthControl = props.todoList.length;
            let todoList = props.todoList ? JSON.parse(JSON.stringify(props.todoList)) : [];
            todoList.forEach(val => val.state = 'read');
            let groupingData = GroupingByDateData(todoList, props.columnDateKey);
            setTodoData(groupingData)
        }
        }
       
    })

    function EditableTodo(key, row, column, value) {
       
        let copyData = JSON.parse(JSON.stringify(todoData));
        copyData[key].forEach(val => {
            if (val.id === row.id) {
                val[column] = value;
            }
        });
        setTodoData(copyData);
        ReturnNewData(JSON.parse(JSON.stringify(copyData)));
    }

    function RemoveTodo(key, row) {
        let copyData = JSON.parse(JSON.stringify(todoData));
        const cData = copyData[key].filter(x => x.id !== row.id);
        copyData[key] = cData;
        if (!(cData && Array.isArray(cData) && cData.length > 0)) {
            delete copyData[key];
        }
        setTodoData(copyData);
        ReturnNewData(JSON.parse(JSON.stringify(copyData)));
    }

    function ReturnNewData(newData) {
        if (props.onNewDataSource) {
            var returnData = [];
            Object.keys(newData).map(val =>
                newData[val].map(x => {
                    delete x.state;
                    returnData.push(x);
                })
            );
            props.onNewDataSource(returnData);
            return returnData;
        }

    }

    return (
        typeof todoData !== 'object' || Object.keys(todoData).map((val, key) =>
            <div key={key} style={{ paddingTop: 20, paddingBottom: 20 }}>
                <i style={{ marginRight: 16 }} className="icon icon-vector"></i>{moment(val).format('dddd, MMMM DD')}
                <table style={{ marginTop: 20 }}>
                    {todoData[val].map((x, k) =>
                        <tr key={k}>
                            <td className="tick" onClick={() => EditableTodo(val, x, 'state', x.state === 'disable' ? 'read' : 'disable')}>
                                <i className={"icon hover-tick " + (x.state === 'disable' ? 'icon-tick-disable' : '')}></i>
                            </td>
                            <td style={{ minWidth: 600 }} className={"tick " + (x.state === 'disable' ? 'disabled-div' : '')}>
                                <input
                                    className="input-text"
                                    type="text"
                                    value={x[props.columnValueKey]}
                                    onChange={e => EditableTodo(val, x, 'value', e.target.value)}
                                    readOnly={x.state !== 'update'}
                                />
                            </td>
                            <td className={"tick " + (x.state === 'disable' ? 'disabled-div' : '')} onClick={() => EditableTodo(val, x, 'state', x.state === 'read' ? 'update' : 'read')}>
                                {x.state !== 'update' ?
                                    <i className="icon icon-edit"></i>
                                    :
                                    <i className="icon icon-tick"></i>
                                }
                            </td>
                            <td className={"tick " + (x.state === 'disable' ? 'disabled-div' : '')} onClick={() => RemoveTodo(val, x)}><i className="icon icon-remove"></i></td>
                        </tr>
                    )}
                </table>
            </div>
        )
    )
}