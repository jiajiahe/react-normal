import * as ACTIONS from '../actions'

const ACTION_HANDLERS = {
    //登录
    [ACTIONS.LOGIN_STATE]: (state, action) => (
        Object.assign({}, state, {
            fetching: action.result
        })
    )
}

const initialState = {}

export function Reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

export default Reducer