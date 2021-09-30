import { configureStore  } from "@reduxjs/toolkit";
import {commonReducer, messagesReducer} from "./reducers";

export  default configureStore({
    reducer: {
        messageBoard: messagesReducer,
        common: commonReducer,
    },
})
