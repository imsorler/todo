import React from 'react';
import axios from 'axios';
import cn from 'classnames';

import Badge from '../Badge';

import remove from '../../assets/icons/remove.svg';
import './List.scss';

const List = ({ items, isRemovable, onClick, onRemove }) => {
  const removeList = (item) => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
      axios.delete(`http://localhost:5000/lists/${item.id}`).then(() => {
        onRemove(item.id);
      })
    }
  };

  return (
    <ul onClick={onClick} className='list'>
      {items.map((item, index) => (
        <li key={index} className={cn(item.className, { active: item.active })}>
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>{item.name}</span>
          {isRemovable && (
            <img
              onClick={() => removeList(item)}
              width={16}
              height={16}
              className='list__remove-icon'
              src={remove}
              alt='Remove icon'
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
