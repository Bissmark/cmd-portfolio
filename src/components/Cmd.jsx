import { useEffect, useRef, useState } from 'react';
import './Cmd.css';
import { commands } from '../utilities/commands';

const Cmd = () => {
    const [inputValue, setInputValue] = useState('');
    const [cmdHistory, setCmdHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

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
            if (commands[inputValue]) {
                console.log(commands[inputValue]);
            }

            setCmdHistory([...cmdHistory, inputValue]);
            setInputValue('');
            setHistoryIndex(-1);
        }
    };

    const _handleKeyPressCmdPrompt = (e) => {
        // Clear the command history
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            setCmdHistory([]);
        }

        // Clear the command prompt input field
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            setInputValue('');
        }

        // Press the up arrow to show the previous command
        if (e.key === 'ArrowUp') {
            if (cmdHistory.length > 0) {
                const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(historyIndex - 1, 0);
                setInputValue(cmdHistory[newIndex]);
                setHistoryIndex(newIndex);
            }
        }

        // Press the down arrow to show the next command
        if (e.key === 'ArrowDown') {
            if (cmdHistory.length > 0) {
                const newIndex = historyIndex + 1;
                if (newIndex >= cmdHistory.length) {
                    setInputValue('');
                    setHistoryIndex(-1);
                } else {
                    setInputValue(cmdHistory[newIndex]);
                    setHistoryIndex(newIndex);
                }
            }
        }
    }

    return (
        <div className='container'>
            <div className="cmd-box" onClick={_handleCmdClick} onKeyDown={_handleKeyPressCmdPrompt}>
                <div className='top-box'>
                    <ul>
                        <li className='minimize'>-</li>
                        <li className='maximize'>□</li>
                        <li className='exit'>X</li>
                    </ul>
                </div>
                <div>
                {cmdHistory.map((cmd, index) => (
                    <div className='inline-commands' key={index}>
                        <p className='time-input'>{new Date().toLocaleTimeString()}</p>
                        <p style={{ color: 'green'}}>{cmd}</p>
                    </div>
                ))}
                </div>
                <div className='inner-cmd-box'>
                    <p className='time-input'>{new Date().toLocaleTimeString()}</p>
                    <input 
                        type="text" 
                        id="cmd" 
                        ref={inputRef}
                        value={inputValue}
                        onChange={_handleInputChange}
                        onKeyDown={_handleKeyPress}
                        style={{ width: `${inputValue.length + 1}ch` }}
                        autoFocus 
                    />
                </div>
            </div>
        </div>
    );
}

export default Cmd;