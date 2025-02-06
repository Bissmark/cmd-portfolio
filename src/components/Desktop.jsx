import { useState } from 'react';
import { FaRecycle } from "react-icons/fa";
import Cmd from "./cmd";
import Footer from "./Footer";
import Browser from './Browser';
import MyComputer from './MyComputer';
import './Desktop.css';

const DesktopIconNames = {
    recycleBin: 'Recycle Bin',
    myComputer: 'My Computer',
    cmdPrompt: 'Powershell',
    myPictures: 'My Pictures',
    browser: 'Browser',
}

const DesktopIcons = ({ name, onDoubleClick }) => {
    return (
        <div className="select-icon" onDoubleClick={onDoubleClick}>
            <FaRecycle className="desktop-icon" />
            <h1>{name}</h1>
        </div>
    );
}

const Desktop = () => {
    const [isBrowserOpen, setIsBrowserOpen] = useState(false);
    const [isMyComputerOpen, setIsMyComputerOpen] = useState(false);

    const _openBrowser = () => {
        setIsBrowserOpen(true);
    };
    
    const _closeBrowser = () => {
        setIsBrowserOpen(false);
    };

    const _openMyComputer = () => {
        setIsMyComputerOpen(true);
    };

    const _closeMyComputer = () => {
        setIsMyComputerOpen(false);
    };

    return (
        <div className="desktop-container">
            <div className="icons-container">
                <DesktopIcons name={DesktopIconNames.recycleBin} />
                <DesktopIcons name={DesktopIconNames.myComputer} onDoubleClick={_openMyComputer} />
                <DesktopIcons name={DesktopIconNames.cmdPrompt} />
                <DesktopIcons name={DesktopIconNames.myPictures} />
                <DesktopIcons name={DesktopIconNames.browser} onDoubleClick={_openBrowser} />
            </div>

            {isBrowserOpen && <Browser onClose={_closeBrowser} />}
            {isMyComputerOpen && <MyComputer onClose={_closeMyComputer} />}
            <Cmd />
            <Footer />
        </div>
    );
}

export default Desktop;