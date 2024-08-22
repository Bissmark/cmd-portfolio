import { useEffect, useRef, useState } from 'react';
import './Cmd.css';

const Cmd = () => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const _handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const _handleCmdClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
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
                <div className='inner-cmd-box'>
                    <p className='time-input'>{new Date().toLocaleTimeString()}</p>
                    <input 
                        type="text" 
                        id="cmd" 
                        ref={inputRef}
                        value={inputValue}
                        onChange={_handleInputChange}
                        style={{ width: `${inputValue.length + 1}ch` }}
                        autoFocus 
                    />
                </div>
            </div>
        </div>
    );
}

export default Cmd;