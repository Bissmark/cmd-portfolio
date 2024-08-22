import { FaRecycle } from "react-icons/fa";
import Cmd from "./cmd";
import './Desktop.css';

const DesktopIconNames = {
    recycleBin: 'Recycle Bin',
    myComputer: 'My Computer',
    myDocuments: 'My Documents',
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
                <DesktopIcons name={DesktopIconNames.myDocuments} />
                <DesktopIcons name={DesktopIconNames.myPictures} />
            </div>
            <Cmd />
        </div>
    );
}

export default Desktop;