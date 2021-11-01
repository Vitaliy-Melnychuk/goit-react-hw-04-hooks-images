import {useState} from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export function Searchbar({onSubmit}) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = evt => {
        setInputValue(evt.currentTarget.value);
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        onSubmit(inputValue);
        setInputValue('');
    };

    return (
        <div className={s.Searchbar}>
            <form onSubmit={handleSubmit} className={s.SearchForm}>
                <input
                    type="text"
                    className={s.SearchFormInput}
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Search images and photos"
                />
                <button type="submit" className={s.SearchFormButton}></button>
            </form>
        </div>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};