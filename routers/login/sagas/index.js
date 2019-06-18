import { call, takeEvery } from 'redux-saga/effects';
import * as Actions from '../actions';
import * as Api from '../api';

// 登录
function* login(opts) {
    try {
        let res = yield call(Api.login,opts);
        opts.callback && opts.callback(res);
    } catch (err) {
        console.log(err, 'err')
    } 
}

export default function* watcher() {
    yield takeEvery(Actions.LOGIN_STATE,login);
}