import { useEffect, useRef } from 'react';
import './StartMenu.css';

const StartMenu = ({ isVisible, onClose }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, onClose]);

    return (
        <div ref={menuRef} className={`start-menu ${isVisible ? 'visible' : 'hidden'}`}>
            <h1>Start Menu</h1>
            <p>Click on a game to start playing!</p>
        </div>
    );
}

export default StartMenu;