import { IoDocumentOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import './MyComputer.css';

const ProjectFiles = {
    ceegeCrypto: {
        name: 'CeegeCrypto',
        url: 'https://github.com/Bissmark/Crypto-Page'
    },
    geoWhere: {
        name: 'GeoWhere',
        url: 'https://github.com/Bissmark/GeoWhere-Testing'
    },
    trello: {
        name: 'Trello',
        url: 'https://github.com/Bissmark/trello'
    },
    snakeRaylib: {
        name: 'SnakeRaylib',
        url: 'asdsa'
    },
    bulletFun: {
        name: 'BulletFun',
        url: 'https://github.com/Bissmark/bulletFun'
    },
    todoApp: {
        name: 'To-Do List',
        url: 'https://github.com/Bissmark/School-Notes-V2'
    }
}

const MyComputer = ({ onClose }) => {
    return (
        <div className="browser-window">
            <div className="browser-header">
                <span>My Computer</span>
                <div className="browser-controls">
                    <button className="control-btn min-btn">-</button>
                    <button className="control-btn max-btn">+</button>
                    <button className="control-btn close-btn" onClick={onClose}>X</button>
                </div>
            </div>

            <div className="browser-url-bar">
                <input type="text" placeholder='https://github.com/Bissmark' />
            </div>

           <div className="browser-content">
                {Object.keys(ProjectFiles).map((key, index) => {
                    const project = ProjectFiles[key]; // Get the project object
                    return (
                        <div key={index} className="file">
                            <a href={project.url} target="_blank">
                                <IoDocumentOutline className="document-icon" />
                                {project.name}
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MyComputer;