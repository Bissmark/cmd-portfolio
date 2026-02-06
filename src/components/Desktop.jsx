import { useState } from 'react';
import { useZIndexManager } from './ZIndexManager';
import { FaRecycle } from "react-icons/fa";
import Cmd from "./Cmd";
import Footer from "./Footer";
import Browser from './Browser';
import MyComputer from './MyComputer';
import GameWindow from './GameWindow';
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
    const [gameWindows, setGameWindows] = useState([]);
    const { bringToFront, getZIndex } = useZIndexManager();

    const _openBrowser = () => {
        bringToFront("Browser");
        if (!isBrowserOpen) setIsBrowserOpen(true);
    };

    const _openMyComputer = () => {
        bringToFront("My Computer");
        if (!isMyComputerOpen) setIsMyComputerOpen(true);
    };

    const _openCmd = () => {
        bringToFront("Powershell");
        if (!isCmdOpen) setIsCmdOpen(true);
    };

    const openGameWindow = (gameSrc, gameTitle) => {
        const gameId = `game-${Date.now()}`;
        setGameWindows([...gameWindows, { id: gameId, src: gameSrc, title: gameTitle }]);
        bringToFront(gameTitle);
    };

    const closeGameWindow = (gameId, gameTitle) => {
        setGameWindows(gameWindows.filter(g => g.id !== gameId));
        unregisterProgram(gameTitle);
    };

    const registerProgram = (program) => {
        setOpenPrograms([...openPrograms, program]);
    };

    const unregisterProgram = (program) => {
        setOpenPrograms(openPrograms.filter(p => p !== program));
    }

    const closeProgram = (name, setStateFunction) => {
        setStateFunction(false);
        unregisterProgram(name);
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
                    onMouseDown={() => bringToFront("Browser")}
                    style={{ position: 'absolute', zIndex: getZIndex("Browser") }}
                >
                    <Browser 
                        onClose={() => closeProgram("Browser", setIsBrowserOpen)} 
                        registerProgram={registerProgram} 
                        unregisterProgram={unregisterProgram}
                        bringToFront={() => bringToFront("Browser")}
                        openGameWindow={openGameWindow}
                    />
                </div>
            )}
            {isMyComputerOpen && (
                <div
                    onMouseDown={() => bringToFront("My Computer")}
                    style={{ position: 'absolute', zIndex: getZIndex("My Computer") }}
                >
                    <MyComputer 
                        onClose={() => closeProgram("My Computer", setIsMyComputerOpen)} 
                        registerProgram={registerProgram} 
                        unregisterProgram={unregisterProgram}
                        bringToFront={() => bringToFront("My Computer")}
                    />
                </div>
            )}

            {isCmdOpen && (
                <div
                    onMouseDown={() => bringToFront("Powershell")}
                    style={{ position: 'absolute', zIndex: getZIndex("Powershell") }}
                >
                    <Cmd 
                        onClose={() => closeProgram("Powershell", setIsCmdOpen)} 
                        registerProgram={registerProgram} 
                        unregisterProgram={unregisterProgram}
                        bringToFront={() => bringToFront("Powershell")}
                    />
                </div>
            )}

            {/* Render all open game windows */}
            {gameWindows.map(game => (
                <div
                    key={game.id}
                    onMouseDown={() => bringToFront(game.title)}
                    style={{ position: 'absolute', zIndex: getZIndex(game.title) }}
                >
                    <GameWindow 
                        onClose={() => closeGameWindow(game.id, game.title)} 
                        registerProgram={registerProgram} 
                        unregisterProgram={unregisterProgram}
                        bringToFront={() => bringToFront(game.title)}
                        gameSrc={game.src}
                        gameTitle={game.title}
                    />
                </div>
            ))}

            <Footer openPrograms={openPrograms} />
        </div>
    );
}

export default Desktop;