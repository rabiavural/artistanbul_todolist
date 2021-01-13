import './App.css';
import { TodoList } from './component/TodoList';
import { AddModal } from './component/AddModal';
import { GetLocalStorage, SetLocalStorage } from './common/function';
import { useState, useEffect } from 'react';

function App() {

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
      <button className="button-add-task" onClick={() => ToggleModal()}>Add New Task</button>
      <TodoList
        todoList={todoList}
        onNewDataSource={data =>setTodoList(data)}
        columnDateKey={'date'}
        columnValueKey={'value'}
      />
      <AddModal
        showModal={showModal}
        setShowModal={setShowModal}
        todoList={todoList}
        returnData={data =>{setTodoList(JSON.parse(JSON.stringify(data)));}}
      />
    </div>
  );
}

export default App;
