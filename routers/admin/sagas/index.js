import { call, takeEvery } from 'redux-saga/effects';
import * as Actions from '../actions';
import * as Api from '../api';

// 获取账号列表
function* allUserListByName(opts) {
    try {
        let res = yield call(Api.allUserListByName,opts);
        opts.callback && opts.callback(res);
    } catch (err) {
        console.log(err, 'err')
    } 
}

// 重置密码
function* administratorResetPassword(opts) {
    try {
        let res = yield call(Api.administratorResetPassword,opts);
        opts.callback && opts.callback(res);
    } catch (err) {
        console.log(err, 'err')
    } 
}

// 账号停用启用
function* forbiddenAgencyAccount(opts) {
    try {
        let res = yield call(Api.forbiddenAgencyAccount,opts);
        opts.callback && opts.callback(res);
    } catch (err) {
        console.log(err, 'err')
    } 
}

// 删除账号
function* deleteAgencyAccount(opts) {
    try {
        let res = yield call(Api.deleteAgencyAccount,opts);
        opts.callback && opts.callback(res);
    } catch (err) {
        console.log(err, 'err')
    } 
}

// 创建账号
function* createUserInfo(opts) {
    try {
        let res = yield call(Api.createUserInfo,opts);
        opts.callback && opts.callback(res);
    } catch (err) {
        console.log(err, 'err')
    } 
}

export default function* watcher() {
    yield takeEvery(Actions.ADMIN_GET_ACCOUNT_LIST,allUserListByName);
    yield takeEvery(Actions.ADMIN_RESET_PASSWORD,administratorResetPassword);
    yield takeEvery(Actions.ADMIN_CHANGE_ACCOUNT_STATUS,forbiddenAgencyAccount);
    yield takeEvery(Actions.ADMIN_DELETE_ACCOUNT,deleteAgencyAccount);
    yield takeEvery(Actions.ADMIN_CREATE_ACCOUNT,createUserInfo);
}