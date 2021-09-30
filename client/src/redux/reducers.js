export const actionTypes = {
    UPDATE_CHANNEL_LIST: "UPDATE_CHANNEL_LIST",
    UPDATE_SELECTED_CHANNEL: "UPDATE_SELECTED_CHANNEL",
    UPDATE_MESSAGE_LIST: "UPDATE_MESSAGE_LIST",
    UPDATE_CURRENT_PAGE: "UPDATE_CURRENT_PAGE",
};


const messagesReducerDefault = {
    channels: [],
    selectedChannel: {},
    messages: [],
};

export const messagesReducer = (state = messagesReducerDefault, action) => {
    const { type } = action;
    switch (type) {
        case actionTypes.UPDATE_CHANNEL_LIST:
            return {
                ...state,
                channels: action.payload,
            };
        case actionTypes.UPDATE_MESSAGE_LIST:
        return {
            ...state,
            messages: action.payload,
        };
        case actionTypes.UPDATE_SELECTED_CHANNEL:
            return {
                ...state,
                selectedChannel: action.payload,
            }
        default: {
            return {
                ...state
            }
        }
    }
}

const commonDefaultState = {
    currentPage: ''
}

export const commonReducer = (state = commonDefaultState, action) => {
    const { type } = action;
    switch (type) {
    case actionTypes.UPDATE_CURRENT_PAGE:
        return {
            ...state,
            currentPage: action.payload,
        };
    default: {
            return {
                ...state
            }
        }
    }
}
