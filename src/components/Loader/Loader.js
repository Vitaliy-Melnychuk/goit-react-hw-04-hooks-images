import React from 'react';
import Loader from "react-loader-spinner";
import s from './Loader.module.css';

export const MyLoader = () => {
    return (
        <div className={s.Loader}>
            Loading
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        </div>
    );

};