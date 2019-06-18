//获取账号列表
export function allUserListByName(opts,type) {
    return axios.post('/allUserListByName', opts.data,true)
        .then(function (result) {
            return result.data;
        }).catch(function(error){
            console.error('URL: '+ interFace+error)
        })
}

//重置密码
export function administratorResetPassword(opts,type) {
    return axios.post('/administratorResetPassword', opts.data,true)
        .then(function (result) {
            return result.data;
        }).catch(function(error){
            console.error('URL: '+ interFace+error)
        })
}

//停用账号
export function forbiddenAgencyAccount(opts,type) {
    return axios.post('/forbiddenAgencyAccount', opts.data,true)
        .then(function (result) {
            return result.data;
        }).catch(function(error){
            console.error('URL: '+ interFace+error)
        })
}

//删除账号
export function deleteAgencyAccount(opts,type) {
    return axios.post('/deleteAgencyAccount', opts.data,true)
        .then(function (result) {
            return result.data;
        }).catch(function(error){
            console.error('URL: '+ interFace+error)
        })
}

//创建账号
export function createUserInfo(opts,type) {
    return axios.post('/createUserInfo', opts.data,true)
        .then(function (result) {
            return result.data;
        }).catch(function(error){
            console.error('URL: '+ interFace+error)
        })
}