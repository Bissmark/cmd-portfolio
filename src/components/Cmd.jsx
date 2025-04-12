import { useEffect, useRef, useState } from 'react';
import { commands } from '../utilities/commands';
import './Cmd.css';

const Cmd = ({ onClose, registerProgram, unregisterProgram }) => {
    const [inputValue, setInputValue] = useState('');
    const [cmdHistory, setCmdHistory] = useState([
        {
            command: '',
            output:
                'Welcome to my portfolio!\n' +
                'This is a simple command prompt simulation.\n' +
                'You can type commands like --help, --about, --contact, --resume, --projects\n' +
                'to see different information.\n' +
                'If you want to clear the command prompt history, press Ctrl + L\n' +
                'If you want to clear the command prompt input field, press Ctrl + C\n' +
                'If you are not comfortable with using the command prompt, you can also\n' +
                'double click on the My Computer icon on the desktop to see my projects\n' +
                'and double click on the Browser icon to see some instructions for how to navigate that and what to type into the address bar\n',
        },
    ]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [size, setSize] = useState({ width: 1200, height: 800 });
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [resizing, setResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState(null);
    const [prevSize, setPrevSize] = useState({ width: 500, height: 250, x: 100, y: 100 });
    const inputRef = useRef(null);
    const windowRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        registerProgram('Powershell');
        console.log('registered');
        return () => {
            unregisterProgram('Powershell');
        };
    }, [registerProgram, unregisterProgram]);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, []);

    const handleMouseDown = (e, direction) => {
        setResizing(true);
        setResizeDirection(direction);
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!resizing) return;

        let newWidth = size.width;
        let newHeight = size.height;

        if (resizeDirection.includes('right')) {
            newWidth = Math.max(300, e.clientX - position.x);
        }
        if (resizeDirection.includes('bottom')) {
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

    const _handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const _handleCmdClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            let output = '';
            const trimmedInput = inputValue.trim().toLowerCase();
            if (commands[trimmedInput]) {
                output = commands[trimmedInput];
            } else if (trimmedInput) {
                output = `Command not found: ${trimmedInput}. Type --help for available commands.`;
            }

            setCmdHistory([...cmdHistory, { command: inputValue, output }]);
            setInputValue('');
            setHistoryIndex(-1);
        }
    };

    const _handleKeyPressCmdPrompt = (e) => {
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            setCmdHistory([]);
        }

        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            setInputValue('');
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (cmdHistory.length > 0) {
                const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(historyIndex - 1, 0);
                setInputValue(cmdHistory[newIndex].command);
                setHistoryIndex(newIndex);
            }
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (cmdHistory.length > 0) {
                const newIndex = historyIndex + 1;
                if (newIndex >= cmdHistory.length) {
                    setInputValue('');
                    setHistoryIndex(-1);
                } else {
                    setInputValue(cmdHistory[newIndex].command);
                    setHistoryIndex(newIndex);
                }
            }
        }
    };

    return (
        <div
            ref={windowRef}
            className={`container ${isFullScreen ? 'fullscreen' : ''}`}
            style={{ width: size.width, height: size.height, left: position.x, top: position.y }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div
                className="cmd-box"
                onClick={_handleCmdClick}
                onKeyDown={_handleKeyPressCmdPrompt}
                tabIndex={0}
            >
                <div className="top-box fixed-header">
                    <ul>
                        <li className="minimize">-</li>
                        <li className="maximize" onClick={toggleFullScreen}>
                            □
                        </li>
                        <li className="exit" onClick={onClose}>
                            X
                        </li>
                    </ul>
                </div>
                <div className="cmd-content" ref={contentRef}>
                    {cmdHistory.map((cmd, index) => (
                        <div key={index}>
                            {cmd.command && (
                                <div className="inline-commands">
                                    <p className="time-input">Test User</p>
                                    <p style={{ color: 'green' }}>{cmd.command}</p>
                                </div>
                            )}
                            {cmd.output && (
                                <div style={{ margin: '0', paddingLeft: '4px', whiteSpace: 'pre-wrap' }}>
                                    {typeof cmd.output === 'string' ? (
                                        cmd.output
                                    ) : cmd.output.type === 'projects' ? (
                                        <div>
                                            <p>projects</p>
                                            {cmd.output.data.map((project, idx) => {
                                                const isLast = idx === cmd.output.data.length - 1;
                                                return (
                                                    <div key={project.name}>
                                                        <p>{isLast ? '└──' : '├──'} {project.name}</p>
                                                        <p>
                                                            {isLast ? '    ' : '│   '} ├── Live:{' '}
                                                            <a
                                                                href={project.live}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{ color: '#00ff00', textDecoration: 'underline' }}
                                                            >
                                                                {project.live}
                                                            </a>
                                                        </p>
                                                        <p>
                                                            {isLast ? '    ' : '│   '} └── GitHub:{' '}
                                                            <a
                                                                href={project.github}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{ color: '#00ff00', textDecoration: 'underline' }}
                                                            >
                                                                {project.github}
                                                            </a>
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="inner-cmd-box">
                    <p className="time-input">{new Date().toLocaleTimeString()}</p>
                    <input
                        className="cmd-prompt"
                        type="text"
                        id="cmd"
                        ref={inputRef}
                        value={inputValue}
                        onChange={_handleInputChange}
                        onKeyDown={_handleKeyPress}
                        style={{ width: `${Math.max(inputValue.length + 1, 10)}ch` }}
                        autoFocus
                    />
                </div>

                <div
                    className="resize-handle bottom-right"
                    onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}
                />
            </div>
        </div>
    );
};

export default Cmd;