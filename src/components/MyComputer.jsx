import { useState, useEffect } from "react";
import { IoDocumentOutline } from "react-icons/io5";

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

const MyComputer = ({ onClose, registerProgram, unregisterProgram }) => {
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        registerProgram("Browser");
        return () => { unregisterProgram("Browser") };
    }, []);

    const _handleChange = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    };

    const filteredProjects = Object.values(ProjectFiles).filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="myComputer-window">
            <div className="myComputer-header">
                <span>My Computer</span>
                <div className="myComputer-controls">
                    <button className="control-btn min-btn">-</button>
                    <button className="control-btn max-btn">+</button>
                    <button className="control-btn close-btn" onClick={onClose}>X</button>
                </div>
            </div>

            <div className="myComputer-url-bar">
                <input type="text" placeholder='' value={searchQuery} onChange={_handleChange} />
            </div>

           <div className="myComputer-content">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => {
                        return (
                            <div key={index} className="file">
                                <a href={project.url} target="_blank">
                                    <IoDocumentOutline className="document-icon" />
                                    <span>{project.name}</span>
                                </a>
                            </div>
                        );
                    })
                ) : (
                    <p>No files found</p>
                )}
            </div>
        </div>
    );
}

export default MyComputer;