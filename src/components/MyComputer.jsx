import { IoDocumentOutline } from "react-icons/io5";
import './MyComputer.css';

const ProjectFiles = {
    ceegeCrypto: 'CeegeCrypto',
    geoWhere: 'GeoWhere',
    trello: 'Trello',
    snakeRaylib: 'SnakeRaylib',
    bulletFun: 'BulletFun',
    todoApp: 'To-Do List',
}

const MyComputer = ({ onClose }) => {
    return (
        <div className="browser-window">
            <div className="browser-header">
                <span>My Computer</span>
                <div className="browser-controls">
                    <button className="control-btn min-btn"></button>
                    <button className="control-btn max-btn"></button>
                    <button className="control-btn close-btn" onClick={onClose}></button>
                </div>
            </div>

            <div className="browser-url-bar">
                <input type="text" placeholder='https://github.com/Bissmark' />
            </div>

            <div className="browser-content">
                {Object.keys(ProjectFiles).map((name, index) => (
                    <div key={index} className="file">
                        <IoDocumentOutline className="document-icon" />
                        <p>{name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyComputer;