'use client'
import React, { useState } from 'react';
import { db } from '../../../server/db';

const suggestions = [
    "artificial intelligence",
    "artificial insemination",
    "article 370",
    "artist",
    "art",
    "ankit",
    "parth bansal",
    "prakhar"
];

function getPrediction(input: string, suggestions: string[]) {
    if (!input) return '';
    const match = suggestions.find(word => word.toLowerCase().startsWith(input.toLowerCase()));
    if (!match) return '';
    return match.slice(input.length); // return only the predicted part
}


const GoogleStyleSearch = () => {
    const [input, setInput] = useState('');
    const prediction = getPrediction(input, suggestions);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Tab' && prediction) {
            e.preventDefault();
            setInput(prev => prev + prediction);
        }
    };


    return (
        <div
            className='border '
            style={{ position: 'relative', width: '100%', maxWidth: 500 }}>
            {/* Ghost text */}
            <input
                value={input + prediction}
                style={{
                    position: 'absolute',
                    color: '#ccc',
                    pointerEvents: 'none',
                    background: 'transparent',
                    width: '80%',
                    zIndex: 0,
                }}
                readOnly
            />

            {/* Actual input */}
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                    position: 'relative',
                    background: 'transparent',
                    zIndex: 1,
                    width: '100%',
                }}
            />
        </div>
    );
};

export default GoogleStyleSearch
