import React from 'react';
import cn from 'classnames';

import Badge from '../Badge';

import remove from '../../assets/icons/remove.svg';
import './List.scss';

const List = ({ items, isRemovable, onClick, onRemove }) => {
  const removeList = (item) => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
      onRemove(item);
    }
  };

  return (
    <ul onClick={onClick} className='list'>
      {items.map((item, index) => (
        <li key={index} className={cn(item.className, { active: item.active })}>
          <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
          <span>{item.name}</span>
          {isRemovable && (
            <img
              onClick={() => removeList(item)}
              width={8}
              height={8}
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
