import React from 'react';


function Message({
                     message
                 }) {
    return (
        <li       style={{
            marginBottom: 15,
            color : '#264149'
        }}>
            {message.message}
        </li>
    );
}

export default Message;
