import { actionTypes } from "./reducers";


export const handleChannels = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/channels`);
            let data = await response.json();
            dispatch({
                type: actionTypes.UPDATE_CHANNEL_LIST,
                payload: data,
            })
        } catch (error) {
            console.log(error)
            alert("sorry something went wrong")
        }
    }
}



export const handleMessage = (channel, callback) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/messages/${channel.cid}`)
            let data = await response.json();
            dispatch({
                type: actionTypes.UPDATE_MESSAGE_LIST,
                payload: data,
            })
            dispatch({
                type: actionTypes.UPDATE_SELECTED_CHANNEL,
                payload: channel,
            })
            callback()
        } catch (error) {
            console.log(error)
            alert("sorry something went wrong")
        }
    }
}

export const handlePostMessage = (message) => {
    return async (dispatch, getState) => {
        try {
            const { messageBoard } = getState();
            const { cid } = messageBoard.selectedChannel;
            const messagesList = [ ...messageBoard.messages]
            const response = await fetch(`${process.env.REACT_APP_API_URL}/${cid}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({message})
            })
            let newMessage = await response.json();
            messagesList.push(newMessage)

            dispatch({
                type: actionTypes.UPDATE_MESSAGE_LIST,
                payload: messagesList,
            })
        } catch (error) {
            console.log(error)
            alert("sorry something went wrong")
        }
    }
}

export const handleUpdateActivePage = (route) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.UPDATE_CURRENT_PAGE,
            payload: route,
        })
    }
}
