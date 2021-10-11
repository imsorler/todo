import React, { useState } from 'react';
import axios from 'axios';

import add from '../../assets/icons/add.svg';

const AddTasksForm = ({ list, onAddTask }) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue('');
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };

    setIsLoading(true);

    axios
      .post('http://localhost:5000/tasks', obj)
      .then(({ data }) => {
        console.log(data);
        onAddTask(list.id, data);
        toggleFormVisible();
      })
      .catch(() => {
        alert('Ошибка при добавлении');
      })
      .finally(() => {
        setIsLoading(false);
      });
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
            <button disabled={isLoading} onClick={addTask} className='button'>
              {isLoading ? 'Добавление...' : 'Добавить задачу'}
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
