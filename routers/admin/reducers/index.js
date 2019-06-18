import * as ACTIONS from '../actions'


const initialState = {
    newAccounts:[]
}

const ACTION_HANDLERS = {
    //设置新创建用户
    [ACTIONS.ADMIN_SET_NEW_ACCOUNTS]: (state, action) => {
        return {
            ...state,
            newAccounts:action.data
        }
    },
}

export function Reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

export default Reducer