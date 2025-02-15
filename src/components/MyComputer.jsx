import { useState, useEffect, useRef } from "react";
import { IoDocumentOutline } from "react-icons/io5";
import './MyComputer.css';

const ProjectFiles = {
    ceegeCrypto: {
        name: 'CeegeCrypto',
        github: 'https://github.com/Bissmark/Crypto-Page',
        hosted: 'https://ceegecrypto.firebaseapp.com/'
    },
    geoWhere: {
        name: 'GeoWhere',
        github: 'https://github.com/Bissmark/GeoWhere-Testing',
        hosted: 'https://geowhere.netlify.app/'
    },
    trello: {
        name: 'Trello',
        github: 'https://github.com/Bissmark/trello',
        hosted: 'https://trello-frontend-q3pp.onrender.com/'
    },
    snakeRaylib: {
        name: 'SnakeRaylib',
        github: 'asdsa',
        hosted: 'https://ceegecrypto.netlify.app/'
    },
    bulletFun: {
        name: 'BulletFun',
        github: 'https://github.com/Bissmark/bulletFun',
        hosted: 'https://ceegecrypto.netlify.app/'
    },
    todoApp: {
        name: 'To-Do List',
        github: 'https://github.com/Bissmark/School-Notes-V2',
        hosted: 'https://school-notes-backend.onrender.com/'
    }
}


const MyComputer = ({ onClose, registerProgram, unregisterProgram }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [size, setSize] = useState({ width: 600, height: 400 });
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [resizing, setResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState(null);
    const [prevSize, setPrevSize] = useState({ width: 600, height: 400, x: 100, y: 100 });
    const [searchQuery, setSearchQuery] = useState('');
    const [openedProject, setOpenedProject] = useState(null);

    const windowRef = useRef(null);

    useEffect(() => {
        registerProgram("My Computer");
        return () => { unregisterProgram("My Computer") };
    }, []);

    const _handleChange = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    };

    const handleMouseDown = (e, direction) => {
        setResizing(true);
        setResizeDirection(direction);
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!resizing) return;

        let newWidth = size.width;
        let newHeight = size.height;

        if (resizeDirection.includes("right")) {
            newWidth = Math.max(300, e.clientX - position.x);
        }
        if (resizeDirection.includes("bottom")) {
            newHeight = Math.max(200, e.clientY - position.y);
        }

        setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
        setResizing(false);
        setResizeDirection(null);
    };

    const toggleFullScreen = () => {
        if (isFullScreen) {
            setSize({ width: prevSize.width, height: prevSize.height });
            setPosition({ x: prevSize.x, y: prevSize.y });
        } else {
            setPrevSize({ width: size.width, height: size.height, x: position.x, y: position.y });
            setSize({ width: window.innerWidth, height: window.innerHeight });
            setPosition({ x: 0, y: 0 });
        }
        setIsFullScreen(!isFullScreen);
    };

    const filteredProjects = Object.values(ProjectFiles).filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div
            ref={windowRef}
            className={`myComputer-window ${isFullScreen ? 'fullscreen' : ''}`}
            style={{ width: size.width, height: size.height, left: position.x, top: position.y }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp} 
        >
            <div className="myComputer-header">
                <span>{openedProject ? openedProject.name : "My Computer"}</span>
                <div className="myComputer-controls">
                    <button className="control-btn min-btn">-</button>
                    <button className="control-btn max-btn" onClick={toggleFullScreen}>□</button>
                    <button className="control-btn close-btn" onClick={onClose}>X</button>
                </div>
            </div>

            <div className="myComputer-url-bar">
                {openedProject ? (
                    <button className="back-button" onClick={() => setOpenedProject(null)}>←</button>
                ) : (
                    <input type="text" placeholder='' value={searchQuery} onChange={_handleChange} />
                )}
            </div>

           <div className="myComputer-content">
                {openedProject ? (
                    <div className="folder-view">
                        <div className="file">
                            <a href={openedProject.github} target="_blank">
                                <IoDocumentOutline className="document-icon" />
                                <span>GitHub Repository</span>
                            </a>
                        </div>
                        {openedProject.hosted && (
                            <div className="file">
                                <a href={openedProject.hosted} target="_blank">
                                    <IoDocumentOutline className="document-icon" />
                                    <span>Live Website</span>
                                </a>
                            </div>
                        )}
                    </div>
                ) : (
                    // Default Project List View
                    filteredProjects.length > 0 ? (
                        filteredProjects.map((project, index) => (
                            <div key={index} className="file" onClick={() => setOpenedProject(project)}>
                                <IoDocumentOutline className="document-icon" />
                                <span>{project.name}</span>
                            </div>
                        ))
                    ) : (
                        <p>No files found</p>
                    )
                )}
            </div>
            <div className="resize-handle bottom-right" onMouseDown={(e) => handleMouseDown(e, "bottom-right")} />
        </div>
    );
}

export default MyComputer;