import { useState } from 'react';
import { ZIndexManager } from './ZIndexManager';
import { FaRecycle } from "react-icons/fa";
import Cmd from "./Cmd";
import Footer from "./Footer";
import Browser from './Browser';
import MyComputer from './MyComputer';
import ChromeImage from '../assets/images/Chrome.png';
import FolderImage from '../assets/images/Folder.png';
import PowershellImage from '../assets/images/Powershell.png';
import RecycleBinImage from '../assets/images/RecycleBin.png';
import './Desktop.css';

const DesktopIconNames = {
    recycleBin: 'Recycle Bin',
    myComputer: 'My Computer',
    cmdPrompt: 'Powershell',
    myPictures: 'My Pictures',
    browser: 'Browser',
}

const DesktopIcons = ({ name, onDoubleClick }) => {
  const getIcon = (name) => {
    switch (name) {
      case DesktopIconNames.browser:
        return <img src={ChromeImage} className="desktop-icon" style={{paddingTop: '10px'}} alt={name} />;
      case DesktopIconNames.myComputer:
        return <img src={FolderImage} className="desktop-icon" style={{paddingTop: '10px'}} alt={name} />;
      case DesktopIconNames.cmdPrompt:
        return <img src={PowershellImage} className="desktop-icon" alt={name} />;
      case DesktopIconNames.myPictures:
        return <img src={FolderImage} className="desktop-icon" style={{paddingTop: '10px'}} alt={name} />;
      case DesktopIconNames.recycleBin:
        return <img src={RecycleBinImage} className="desktop-icon" style={{paddingTop: '5px'}} alt={name} />;
      default:
        return <FaRecycle className="desktop-icon" />;
    }
  };

  return (
    <div className="select-icon" onDoubleClick={onDoubleClick}>
      {getIcon(name)}
      <h1>{name}</h1>
    </div>
  );
};

const Desktop = () => {
    const [isBrowserOpen, setIsBrowserOpen] = useState(false);
    const [isMyComputerOpen, setIsMyComputerOpen] = useState(false);
    const [isCmdOpen, setIsCmdOpen] = useState(true);
    const [openPrograms, setOpenPrograms] = useState([]);

    const { bringToFront, getZIndex } = ZIndexManager();

    const _openBrowser = () => {
        bringToFront("Browser");
        setIsBrowserOpen(true);
    };

    const _openMyComputer = () => {
        bringToFront("My Computer");
        setIsMyComputerOpen(true);
    };

    const _openCmd = () => {
        bringToFront("Powershell");
        setIsCmdOpen(true);
    };

    const registerProgram = (program) => {
        setOpenPrograms([...openPrograms, program]);
    };

    const unregisterProgram = (program) => {
        setOpenPrograms(openPrograms.filter(p => p !== program));
    }

    return (
        <div className="desktop-container">
            <div className="icons-container">
                <DesktopIcons name={DesktopIconNames.recycleBin} />
                <DesktopIcons name={DesktopIconNames.myComputer} onDoubleClick={_openMyComputer} />
                <DesktopIcons name={DesktopIconNames.cmdPrompt} onDoubleClick={_openCmd} />
                <DesktopIcons name={DesktopIconNames.myPictures} />
                <DesktopIcons name={DesktopIconNames.browser} onDoubleClick={_openBrowser} />
            </div>

            {isBrowserOpen && (
                <div
                    className="window"
                    onMouseDown={() => bringToFront("browser")}
                    style={{ position: 'absolute', zIndex: getZIndex("browser") }}
                >
                    <Browser onClose={() => setIsBrowserOpen(false)} registerProgram={registerProgram} unregisterProgram={unregisterProgram} />
                </div>
            )}
            {isMyComputerOpen && (
                <div
                    className="window"
                    onMouseDown={() => bringToFront("myComputer")}
                    style={{ position: 'absolute', zIndex: getZIndex("myComputer") }}
                >
                    <MyComputer onClose={() => setIsMyComputerOpen(false)} registerProgram={registerProgram} unregisterProgram={unregisterProgram} />
                </div>
            )}

            {isCmdOpen && (
                <div
                    className="window"
                    onMouseDown={() => bringToFront("cmd")}
                    style={{ position: 'absolute', zIndex: getZIndex("cmd") }}
                >
                    <Cmd onClose={() => setIsCmdOpen(false)} registerProgram={registerProgram} unregisterProgram={unregisterProgram} />
                </div>
            )}
            <Footer openPrograms={openPrograms} />
        </div>
    );
}

export default Desktop;