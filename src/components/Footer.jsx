import { useState } from 'react';
import WindowsStart from '../assets/images/WindowsStart.png';
import ChromeImage from '../assets/images/Chrome.png';
import ExplorerIcon from '../assets/images/Explorer.png';
import PowershellImage from '../assets/images/Powershell.png';
import './Footer.css';
import StartMenu from './StartMenu';

const Footer = ({ openPrograms }) => {
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
                <div onClick={_handleStartMenu} className='taskbar'>
                    <img className='start-menu-button' src={WindowsStart} alt="" />
                    {openPrograms.includes('My Computer') && (
                        <img src={ExplorerIcon} className="taskbar-icon" alt="Explorer Icon" />
                    )}
                    {openPrograms.includes('Browser') && (
                        <img src={ChromeImage} className="taskbar-icon" alt="Chrome Icon" />
                    )}
                    {openPrograms.includes('Powershell') && (
                        <img src={PowershellImage} className="taskbar-icon" alt="Explorer Icon" />
                    )}
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