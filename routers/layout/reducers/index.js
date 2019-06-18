import * as ACTIONS from '../actions'


const initialState = {
    userInfo:{},
    curUser:{}
}

const ACTION_HANDLERS = {
    //设置用户信息
    [ACTIONS.LAYOUT_SET_UERINFO]: (state, action) => {
        return {
            ...state,
            userInfo:action.data
        }
    },
    //设置当前用户
    [ACTIONS.LAYOUT_SET_CURUSER]: (state, action) => {
        return {
            ...state,
            curUser:action.data
        }
    },
}

export function Reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

export default Reducer