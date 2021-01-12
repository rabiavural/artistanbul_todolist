import './App.css';
import { TodoList } from './component/TodoList';
import { AddModal } from './component/AddModal';
import { GetLocalStorage, SetLocalStorage } from './common/function';
import { useState, useEffect } from 'react';

function App() {

  let array_data = [
    { id: 1, date: '2021-1-10', value: 'test data 1' },
    { id: 2, date: '2021-1-10', value: 'test data 2' },
    { id: 3, date: '2021-1-11', value: 'test data 3' }
  ];

  const [showModal, setShowModal] = useState(false);
  const [todoList, setTodoList] = useState(JSON.parse(GetLocalStorage('todoList')));

  useEffect(() => {
    SetLocalStorage('todoList', JSON.stringify(todoList))
  })
  //SetLocalStorage('todoList', JSON.stringify(array_data));

  function ToggleModal() {
    setShowModal(!showModal)
  }

  return (
    <div className="main-page">
      <p className="header-text">To do</p>
      {console.log(todoList)}
      <button className="button-add-task" onClick={() => ToggleModal()}>Add New Task</button>
      <TodoList
        todoList={todoList}
        onNewDataSource={data =>setTodoList(data) }
        columnDateKey={'date'}
        columnValueKey={'value'}
      />
      <AddModal
        showModal={showModal}
        setShowModal={setShowModal}
        todoList={todoList}
        returnData={data =>{setTodoList(JSON.parse(JSON.stringify(data)));console.log(data)}}
      />
    </div>
  );
}

export default App;
