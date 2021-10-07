import React, { useState } from 'react';

import add from '../../assets/icons/add.svg';

const AddTasksForm = ({ list, onAddTask }) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue('');
  };

  const addTask = () => {
    const obj = { listId: list.id, text: inputValue, completed: false };
    onAddTask(list.id, obj);
    toggleFormVisible();
  };

  return (
    <div className='tasks__form'>
      {!visibleForm ? (
        <>
          <div onClick={toggleFormVisible} className='tasks__form-new'>
            <img width={20} height={20} src={add} alt='Add icon' />
            <span>Новая задача</span>
          </div>
        </>
      ) : (
        <>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='field'
            type='text'
            placeholder='Текст задачи'
          />
          <div className='tasks__form-block'>
            <button onClick={addTask} className='button'>
              Добавить задачу
            </button>
            <button onClick={toggleFormVisible} className='button button--grey'>
              Отмена
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddTasksForm;
