import * as Actions from '../actions'

const ACTION_HANDLERS = {
    //load
    [Actions.QUALITYDOC_LOAD]: (state, action) => {
        return {...state, load:action.result}
    },
    //待审核列表
    [Actions.QUALITYDOC_LIST_GET]: (state, action) => {
        let array = [];
        (action.result || []).forEach((item,i)=>{
            array.push({
                ...item,
                content_json:JSON.parse(item.content_json || '{"contentJson":"{}"}').contentJson || {},
            })
        });
        return {...state, list:array,numObj:action.otherResult}
    },
    //通过，退回列表
    [Actions.QUALITYDOC_OTHER_LIST_GET]: (state, action) => {
        let array = [];
        (action.result || []).forEach((item,i)=>{
            array.push({
                ...item,
                content_json:JSON.parse(item.content_json || '{"contentJson":"{}"}').contentJson || {},
            })
        });
        return {...state, otherList:array,numObj:action.otherResult}
    },
    //通过或退回
    [Actions.QUALITYDOC_PASS_OR_BACK_GET]: (state, action) => {
        return {...state, result:action.result}
    }
}
const initialState = {
    load:false,
    list:[],
    otherList:[],
    numObj:{ auditedFormList:0, passedFormList:0, returnedFormList:0},
    result:{}
};

export function Reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

export default Reducer
