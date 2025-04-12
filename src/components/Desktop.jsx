import { useState } from 'react';
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
  // Map icon names to images or React icons
  const getIcon = (name) => {
    switch (name) {
      case DesktopIconNames.browser:
        return <img src={ChromeImage} className="desktop-icon" alt={name} />;
      case DesktopIconNames.myComputer:
        return <img src={FolderImage} className="desktop-icon" alt={name} />;
      case DesktopIconNames.cmdPrompt:
        return <img src={PowershellImage} className="desktop-icon" alt={name} />;
      case DesktopIconNames.myPictures:
        return <img src={FolderImage} className="desktop-icon" alt={name} />;
      case DesktopIconNames.recycleBin:
        return <img src={RecycleBinImage} className="desktop-icon" alt={name} />;
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
    const [isCmdOpen, setIsCmdOpen] = useState(false);
    const [openPrograms, setOpenPrograms] = useState([]);

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

    const _openCmd = () => {
        setIsCmdOpen(true);
    };

    const _closeCmd = () => {
        setIsCmdOpen(false);
    }

    const registerProgram = (program) => {
        setOpenPrograms([...openPrograms, program]);
        console.log(openPrograms);
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

            {isBrowserOpen && <Browser onClose={_closeBrowser} registerProgram={registerProgram} unregisterProgram={unregisterProgram} />}
            {isMyComputerOpen && <MyComputer onClose={_closeMyComputer} registerProgram={registerProgram} unregisterProgram={unregisterProgram} />}
            {isCmdOpen && <Cmd onClose={_closeCmd} registerProgram={registerProgram} unregisterProgram={unregisterProgram} /> }
            <Footer openPrograms={openPrograms} />
        </div>
    );
}

export default Desktop;