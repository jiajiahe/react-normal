//保存账号信息
export function editUserInfo(opts,type) {
    return axios.post('/editUserInfo', opts.data,true)
        .then(function (result) {
            return result.data;
        }).catch(function(error){
            console.error('URL: '+ interFace+error)
        })
}

//修改密码
export function updatePassword(opts,type) {
    return axios.post('/updatePassword', opts.data,true)
        .then(function (result) {
            return result.data;
        }).catch(function(error){
            console.error('URL: '+ interFace+error)
        })
}

//修改手机号
export function updateMobile(opts,type) {
    return axios.post('/updateMobile', opts.data,true)
        .then(function (result) {
            return result.data;
        }).catch(function(error){
            console.error('URL: '+ interFace+error)
        })
}

