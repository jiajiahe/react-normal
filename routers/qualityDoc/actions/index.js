export const QUALITYDOC_LOAD = "QUALITYDOC_LOAD";
export const qualityDocLoad =(result) =>{
    return{
        type:QUALITYDOC_LOAD,
        result
    }
}
//待审核列表
export const QUALITYDOC_LIST_SET = "QUALITYDOC_LIST_SET";
export const QUALITYDOC_LIST_GET = "QUALITYDOC_LIST_GET";
export const qualityDocSetList =(result) =>{
    return{
        type:QUALITYDOC_LIST_SET,
        result
    }
}
export const qualityDocGetList =(result,otherResult) =>{
    return{
        type:QUALITYDOC_LIST_GET,
        result,otherResult
    }
}
//通过，退回列表
export const QUALITYDOC_OTHER_LIST_SET = "QUALITYDOC_OTHER_LIST_SET";
export const QUALITYDOC_OTHER_LIST_GET = "QUALITYDOC_OTHER_LIST_GET";
export const qualityDocSetOtherList =(result) =>{
    return{
        type:QUALITYDOC_OTHER_LIST_SET,
        result
    }
}
export const qualityDocGetOtherList =(result,otherResult) =>{
    return{
        type:QUALITYDOC_OTHER_LIST_GET,
        result,otherResult
    }
}
//通过
export const QUALITYDOC_PASS_OR_BACK_SET = "QUALITYDOC_PASS_OR_BACK_SET";
export const QUALITYDOC_PASS_OR_BACK_GET = "QUALITYDOC_PASS_OR_BACK_GET";
export const qualityDocSetPassOrBack =(result) =>{
    return{
        type:QUALITYDOC_PASS_OR_BACK_SET,
        result
    }
}
export const qualityDocGetPassOrBack =(result) =>{
    return{
        type:QUALITYDOC_PASS_OR_BACK_GET,
        result
    }
}