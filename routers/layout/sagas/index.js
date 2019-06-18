import { call, takeEvery } from 'redux-saga/effects';
import * as Actions from '../actions';
import * as Api from '../api';

//保存账户信息
function* editUserInfo(opts) {
    try {
        let res = yield call(Api.editUserInfo,opts);
        opts.callback && opts.callback(res);
    } catch (err) {
        console.log(err, 'err')
    } 
}

//修改密码
function* updatePassword(opts) {
    try {
        let res = yield call(Api.updatePassword,opts);
        opts.callback && opts.callback(res);
    } catch (err) {
        console.log(err, 'err')
    } 
}

//修改手机号
function* updateMobile(opts) {
    try {
        let res = yield call(Api.updateMobile,opts);
        opts.callback && opts.callback(res);
    } catch (err) {
        console.log(err, 'err')
    } 
}

export default function* watcher() {
    yield takeEvery(Actions.LAYOUT_EDIT_UERINFO,editUserInfo);
    yield takeEvery(Actions.LAYOUT_EDIT_PASSWORD,updatePassword);
    yield takeEvery(Actions.LAYOUT_EDIT_MOBILE,updateMobile);
}