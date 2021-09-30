import React from 'react';
import {useDispatch} from "react-redux";
import {handleMessage, handleUpdateActivePage} from "../../redux/action";

function Channel({
    channel,
    selectedChannelName
 }) {
    const dispatch = useDispatch();
    // selectedChannel
    const handlePageUpdate = () => {
        dispatch(handleUpdateActivePage('message_section'));
    }
    const handleOnClick = () => {
        dispatch(handleMessage(channel, handlePageUpdate))
    }
    const color =  selectedChannelName === channel.name ? 'green' : 'blue'
    return (
        <li
            onClick={handleOnClick}
            style={{
                marginBottom: 15,
                cursor: "pointer",
                color
            }}
        >
           {channel.name}
        </li>
    );
}

export default Channel;
