import React from 'react';
import axios from 'axios';

import AddTasksForm from './AddTasksForm';
import Task from './Task';

import edit from '../../assets/icons/pencil.svg';

import './Tasks.scss';

const Tasks = ({ list, onEditTitle, onAddTask, onRemoveTask, onEditTask, withoutEmpty }) => {
  const editTitle = () => {
    const newTitle = window.prompt('Новое название списка', list.name);

    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch('http://localhost:5000/lists/' + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert('Не удалось обновить название');
        });
    }
  };

  return (
    <div className='tasks'>
      <h2 style={{ color: list.color.hex }} className='tasks__title'>
        {list.name}
        <img onClick={editTitle} width={16} height={16} src={edit} alt='Edit icon' />
      </h2>

      <div className='tasks__items'>
        {!withoutEmpty && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks.map((task) => (
          <Task key={task.id} task={task} list={list} onEdit={onEditTask} onRemove={onRemoveTask} />
        ))}
        <AddTasksForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
