import { useEffect, useRef, useState } from 'react';
import './Cmd.css';

const Cmd = () => {
    const [inputValue, setInputValue] = useState('');
    const [cmdHistory, setCmdHistory] = useState([]);
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
            setCmdHistory([...cmdHistory, inputValue]);
            setInputValue('');
        }
    };

    return (
        <div className='container'>
            <div className="cmd-box" onClick={_handleCmdClick}>
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