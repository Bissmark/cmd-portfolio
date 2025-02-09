import { useState, useEffect, useRef } from "react";
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
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [size, setSize] = useState({ width: 600, height: 400 });
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [resizing, setResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState(null);
    const [prevSize, setPrevSize] = useState({ width: 600, height: 400, x: 100, y: 100 });
    const [searchQuery, setSearchQuery] = useState('');

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
                <span>My Computer</span>
                <div className="myComputer-controls">
                    <button className="control-btn min-btn">-</button>
                    <button className="control-btn max-btn" onClick={toggleFullScreen}>□</button>
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
            <div className="resize-handle bottom-right" onMouseDown={(e) => handleMouseDown(e, "bottom-right")} />
        </div>
    );
}

export default MyComputer;