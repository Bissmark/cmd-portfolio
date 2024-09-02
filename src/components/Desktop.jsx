import { FaRecycle } from "react-icons/fa";
import Cmd from "./cmd";
import Footer from "./Footer";
import './Desktop.css';

const DesktopIconNames = {
    recycleBin: 'Recycle Bin',
    myComputer: 'My Computer',
    cmdPrompt: 'Powershell',
    myPictures: 'My Pictures',
}

const DesktopIcons = ({ name }) => {
    return (
        <div className="select-icon">
            <FaRecycle className="desktop-icon" />
            <h1>{name}</h1>
        </div>
    );
}

const Desktop = () => {

    return (
        <div className="desktop-container">
            <div className="icons-container">
                <DesktopIcons name={DesktopIconNames.recycleBin} />
                <DesktopIcons name={DesktopIconNames.myComputer} />
                <DesktopIcons name={DesktopIconNames.cmdPrompt} />
                <DesktopIcons name={DesktopIconNames.myPictures} />
            </div>
            <Cmd />
            <Footer />
        </div>
    );
}

export default Desktop;