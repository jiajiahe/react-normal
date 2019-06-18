import {call, put, takeEvery} from 'redux-saga/effects';
import * as Actions from '../actions';
import * as Api from '../api';
import {message} from 'antd';
let userInfo = JSON.parse(sessionStorage.getItem('lungUserInfo'));
let roleName = userInfo.roleList[0].roleName;
let qualityDocName = userInfo.name;
// 获取待审核列表
function* getQualitylList(action) {
    try {
        yield put(Actions.qualityDocLoad(true));
        let res = yield call(Api.qualityDocListApi, Object.assign(action.data, {roleName: roleName}));
        if (res.code === 200) {
            yield put(Actions.qualityDocLoad(false));
            yield put(Actions.qualityDocGetList(
                res.object.controllerAuditeFormList.list,{
                    auditedFormList:res.object.auditedCountFormList,
                    passedFormList:res.object.passedCountFormList,
                    returnedFormList:res.object.returnedCountFormList
                }));
            action.callBack && action.callBack(res.object);
        }else{
            message.error(res.message)
        }
    } catch (err) {
        console.log(err, 'err')
    } finally {
        yield put(Actions.qualityDocLoad(false));
    }
}
// 获取通过，退回列表
function* getQualitylOtherList(action) {
    try {
        yield put(Actions.qualityDocLoad(true));
        let res = yield call(Api.qualityDocOtherListApi, Object.assign(action.data, {roleName: roleName}));
        if (res.code === 200) {
            yield put(Actions.qualityDocLoad(false));
            yield put(Actions.qualityDocGetOtherList(
                res.object.getqualityControlDoctorFormList.list,{
                auditedFormList:res.object.auditedFormList,
                passedFormList:res.object.passedFormList,
                returnedFormList:res.object.returnedFormList
            }));
            action.callBack && action.callBack(res.object);
        }else{
            message.error(res.message)
        }
    } catch (err) {
        console.log(err, 'err')
    } finally {
        yield put(Actions.qualityDocLoad(false));
    }
}

// 通过或退回操作
function* getQualitylPassOrBack(action) {
    try {
        yield put(Actions.qualityDocLoad(true));
        let res = yield call(Api.qualityDocPassOrBackApi, Object.assign(action.data, {roleName: roleName,reviewer:qualityDocName}));
        if (res.code === 200) {
            yield put(Actions.qualityDocLoad(false));
            yield put(Actions.qualityDocGetPassOrBack(res));
            action.callBack && action.callBack(res);
        }else{
            message.error(res.message)
        }
    } catch (err) {
        console.log(err, 'err')
    } finally {
        yield put(Actions.qualityDocLoad(false));
    }
}


export default function* watcher() {
    yield takeEvery('QUALITYDOC_LIST_SET', getQualitylList);
    yield takeEvery('QUALITYDOC_OTHER_LIST_SET',getQualitylOtherList);
    yield takeEvery("QUALITYDOC_PASS_OR_BACK_SET", getQualitylPassOrBack);
}
