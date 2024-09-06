import { useState } from 'react';

import { FaRecycle } from "react-icons/fa";
import './Footer.css';
import StartMenu from './StartMenu';

const Footer = () => {

    const [isStartMenuVisible, setIsStartMenuVisible] = useState(false);

    const _handleStartMenu = () => {
        setIsStartMenuVisible(!isStartMenuVisible);
    };

    const _handleCloseStartMenu = () => {
        setIsStartMenuVisible(false);
    };

    return (
        <>
            <div className="footer">
                <div onClick={_handleStartMenu}>
                    <FaRecycle className="start-menu-button" />
                </div>
                <div className='time-date'>
                    <p style={{ marginBottom: '2px'}}>{new Date().toLocaleTimeString()}</p>
                    <p>{new Date().toLocaleDateString()}</p>
                </div>
            </div>
            <StartMenu isVisible={isStartMenuVisible} onClose={_handleCloseStartMenu} />
        </>
    );
}

export default Footer;