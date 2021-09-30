import React from 'react';

import './List.scss';

const List = ({ items }) => {
  return (
    <ul className='list'>
      {items.map((item) => (
        <li className={item.active ? 'active' : ''}>
          <i>{item.svg ? item.svg : <i className={`badge badge--${item.color}`}></i>}</i>
          <spam>{item.name}</spam>
        </li>
      ))}
    </ul>
  );
};

export default List;
