import { useEffect } from "react";
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export function Modal({image, onClose}) {
    useEffect( () => {
        const handleKeyDown = evt => {
            if (evt.code === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleBackdropClick = evt => {
        if (evt.currentTarget === evt.target) {
            onClose();
        }
    };
    
    return (
        <div className={s.Overlay} onClick={handleBackdropClick}>
            <div className={s.Modal}>
                <img src={image} alt="gg" />
            </div>
        </div>
    );
}

Modal.propTypes = {
    image: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};
