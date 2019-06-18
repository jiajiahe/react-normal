//登录
export function login(opts) {
    return axios.post('/login', opts.data,true)
        .then(function (result) {
            return result.data;
        }).catch(function(error){
            console.error('URL: '+ interFace+error)
        })
}
