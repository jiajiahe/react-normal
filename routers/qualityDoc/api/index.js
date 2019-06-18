//待审核列表
export function qualityDocListApi (opts){
    let interFace = "/getFormList";
    return axios.post(interFace,opts)
        .then((result)=>{
            return result.data;
        }).catch((error)=>{
            console.error('URL: '+ interFace + error);
            return error;
        })
}
//通过，退回列表
export function qualityDocOtherListApi (opts){
    let interFace = "/getqualityControlDoctorFormList";
    return axios.post(interFace,opts)
        .then((result)=>{
            return result.data;
        }).catch((error)=>{
            console.error('URL: '+ interFace + error);
            return error;
        })
}
//退回，通过操作
export function qualityDocPassOrBackApi(opts){
    let interFace = "/qualityControlDoctorOperation";
    return axios.post(interFace,opts)
        .then((result)=>{
            return result.data;
        }).catch((error)=>{
            console.error('URL: '+ interFace + error);
            return error
        })
}
//导出
export function qualityDocExportApi(opts){
    let interFace = "/exportPdf";
    return axios.get(interFace,opts)
        .then((result)=>{
            console.log(result)
            return result.data;
        }).catch((error)=>{
            console.error('URL: '+ interFace + error);
            return error
        })
}
