import React, { useState } from 'react';
import List from '../List';
import Badge from '../Badge';

import close from '../../assets/icons/close.svg';
import './AddButtonList.scss';

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState('');

  const handleChangeValue = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    setSelectedColor(colors[0].id);
  };

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка');
      return;
    }

    const color = colors.filter((c) => c.id === selectedColor)[0].name;

    onAdd({
      id: Math.random(),
      name: inputValue,
      color,
    });

    onClose();
  };

  return (
    <div className='add-list'>
      <List
        onClick={() => setVisiblePopup(!visiblePopup)}
        items={[
          {
            className: 'list__add-button',
            icon: (
              <svg
                width='12'
                height='12'
                viewBox='0 0 12 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M6 1V11'
                  stroke='black'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M1 6H11'
                  stroke='black'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            ),
            name: 'Добавить список',
          },
        ]}
      />
      {visiblePopup && (
        <div className='add-list__popup'>
          <img
            onClick={onClose}
            width={18}
            height={18}
            src={close}
            alt='Close button'
            className='add-list__popup-close-btn'></img>
          <input
            value={inputValue}
            onChange={(e) => handleChangeValue(e)}
            className='field'
            type='text'
            placeholder='Название списка'
          />
          <div className='add-list__popup-colors'>
            {colors.map((color) => (
              <Badge
                onClick={() => setSelectedColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && 'active'}
              />
            ))}
          </div>
          <button onClick={addList} className='button'>
            Добавить
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
