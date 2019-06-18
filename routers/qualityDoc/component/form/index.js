import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Button,Drawer,Form,Radio,Checkbox } from 'antd';
import './index.less'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

class DrawerForm extends Component{

    onFormSubmit = (type) =>{
        if(type === '2'){//退出
            this.props.onCloseDrawer();
            this.props.onReBack(this.props.row,"reback");
        }else if(type === '3'){//导出
            this.props.onCloseDrawer();
            this.props.onReBack(this.props.row,"export");
        }else{//通过（待审核）
            this.props.onReBack(this.props.row,"pass");
        }
    }
    onCloseDrawer = () =>{
        this.props.onCloseDrawer();
    }
	
	dateformat = (date) =>{
        if(date){
            return date.replace('-',' 年 ').replace('-',' 月 ') + ' 日 '
        }
        return '';
    }

    timeformat = (time) =>{
        if(time){
            return time.replace(':',' 时 ') + ' 分 '
        }
        return '';
    }


    render(){
        const {formTitle,formVisible,tabIndex,formInfo,row} = this.props;
        let transferNote = formInfo.transferNote?''+formInfo.transferNote:"";
        const zhuanyunArr = [
            {value:'0',label:'普通公路'},
            {value:'1',label:'高速公路'},
            {value:'2',label:'高铁'},
            {value:'3',label:'飞机'},
            {value:'4',label:'院内转运'},
            {value:'5',label:'其他，注明：'+ transferNote},
        ];
       
        return(
            <Drawer className="drawerForm"
                    width={900}
                    title={formTitle}
                    placement="right"
                    onClose={this.onCloseDrawer}
                    visible={formVisible}>
                <Form id="form" layout="inline">
                    <div className="form-no-border">
                        <FormItem className="form-item-right"
                                  label="供者来源医院">
                            {(
                                <span className="donnerHosp form-item" title={formInfo.sourceOfDonorsArea+formInfo.sourceOfDonors}>{formInfo.sourceOfDonorsArea+formInfo.sourceOfDonors}</span>
                            )}
                        </FormItem>
                        <FormItem className="form-item-right form-item"
                                  label="取肺医生">
                            {(
                                <span className="doc form-item">{formInfo.pulmonarySurgeon}</span>
                            )}
                        </FormItem>
                        <FormItem className="form-item-right form-item"
                                  label="供者联系医生">
                            {(
                                <span className="relativeDoc form-item">{formInfo.donorContactDoctor}</span>
                            )}
                        </FormItem>
                        <FormItem className="form-item form-item-no-right"
                                  label="联系方式">
                            {(
                                <span className="phone form-item">{formInfo.donorContactDoctorPhone}</span>
                            )}
                        </FormItem>
                    </div>
                    <div className="form-middle-content">
                        <FormItem className="form-item-left form-item-no-right"
                                  label="供肺摘取日期">
                            {(
                                <span className="form-item">
								{this.dateformat(formInfo.donorLungExtractionBeginDate)}&nbsp;
								{this.timeformat(formInfo.donorLungExtractioBeginTime)}
								</span>
                            )}
                        </FormItem>
                        <span className="form-text">至</span>
                        <FormItem className="form-item-right">
                            {(
                                <span className="form-item">
                                    {this.dateformat(formInfo.donorLungExtractionEndDate)}&nbsp;
                                    {this.timeformat(formInfo.donorLungExtractionEndTime)}
                                </span>
                            )}
                        </FormItem>
                        <FormItem className="form-item-right form-item"
                                  label="总手术时间">
                            {(
                                <span className="doc">{formInfo.totalOperativeHours} h {formInfo.totalOperativeMinutes} min </span>
                            )}
                        </FormItem>
                        <div className="form-sub-middle-content">
                            <div className="form-sub-left">
                                <div className="form-sub-left-item">
                                    <div className="form-sub-title">基本资料</div>
                                    <div className="form-sub-content">
                                        <FormItem className="form-item-right"
                                                  label="姓名">
                                            {(
                                                <span className="form-item">{formInfo.name}</span>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="出生日期">
                                            {(
                                                <span className="form-item">{formInfo.birthDate}</span>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="籍贯">
                                            {(
                                                <span className="form-item">{formInfo.nativePlace}</span>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="性别">
                                            {(
                                                <RadioGroup value={formInfo.sex}>
                                                    <Radio value={"0"}>男</Radio>
                                                    <Radio value={"1"}>女</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="年龄">
                                            {(
                                                <span className="form-item">{formInfo.age}岁</span>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="体重">
                                            {(
                                                <span className="form-item">{formInfo.weight}KG</span>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="身高">
                                            {(
                                                <span className="form-item">{formInfo.height}CM</span>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="胸围">
                                            {(
                                                <span className="form-item">{formInfo.bust}CM</span>
                                            )}
                                        </FormItem>
										<FormItem className="form-item-right form-full-width"
                                                  label="证件类型">
                                            {(
                                                <RadioGroup value={formInfo.cardType}>
                                                    <Radio value={"0"}>中国居民身份证</Radio>
                                                    <Radio value={"1"}>军官证</Radio>
                                                    <Radio value={"2"}>武警警官证</Radio>
                                                    <Radio value={"3"}>香港居民身份证</Radio>
                                                    <Radio value={"4"}>香港居民来往内地通行证</Radio>
                                                    <Radio value={"5"}>澳门居民身份证</Radio>
                                                    <Radio value={"6"}>澳门居民来往内地通行证</Radio>
                                                    <Radio value={"7"}>台湾居民来往大陆通行证</Radio>
                                                    <Radio value={"8"}>外国护照</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
										<FormItem className="form-item-right form-full-width"
                                                  label="证件号">
                                            {(
                                                <span className="form-item">{formInfo.identificationNumber}</span>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="form-sub-left-item">
                                    <div className="form-sub-title">死亡类型</div>
                                    <div className="form-sub-content">
                                        <FormItem
                                                  label="供者类型">
                                            {(
                                                <RadioGroup value={formInfo.donorType}>
                                                    <Radio value={"0"}>脑死亡（DBD）</Radio>
                                                    <Radio value={"1"}>心脏死亡（DCD）</Radio>
                                                    <Radio value={"2"}>心脑死亡（DBCD）</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem
                                                  label="死亡原因">
                                            {(
                                                <RadioGroup value={formInfo.causeOfDeath}>
                                                    <Radio value={"0"}>缺氧/心脏骤停</Radio>
                                                    <Radio value={"1"}>脑死亡</Radio>
                                                    <Radio value={"2"}>脑血管疾病/中风</Radio>
                                                    <Radio value={"3"}>中枢神经系统肿瘤</Radio>
                                                    <Radio value={"4"}>其他，注明：{formInfo.causeOfDeath === '4'?"：" +formInfo.otherCauseOfDeath:null}</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="form-sub-left-item">
                                    <div className="form-sub-title">呼吸系统</div>
                                    <div className="form-sub-content">
                                        <FormItem className="form-item-right form-full-width"
                                                  label="呼吸机时间">
                                            {(
                                                <span className="form-item">{formInfo.ventilatorTime}天</span>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="误吸程度">
                                            {(
                                                <RadioGroup value={formInfo.aspirationLevel}>
                                                    <Radio value={"0"}>无</Radio>
                                                    <Radio value={"1"}>有</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right form-full-width"
                                                  label="氧合指数">
                                            {(
                                                <span className="form-item">{formInfo.oxygenationIndex}</span>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right form-full-width"
                                                  label="胸片/CT">
                                            {(
                                                <span className="form-item">{formInfo.chestRadiographCT}</span>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right form-full-width"
                                                  label="支气管镜">
                                            {(
                                                <span className="form-item">{formInfo.bronchoscope}</span>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="form-sub-left-item">
                                    <div className="form-sub-title">吸烟史</div>
                                    <div className="form-sub-content">
                                        <FormItem className="form-item-right form-full-width"
                                                  label="是否吸烟">
                                            {(
                                                <RadioGroup value={formInfo.smoking}>
                                                    <Radio value={"0"}>否</Radio>
                                                    <Radio value={"1"}>是</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>                                   
                                        {
                                            formInfo.smoking === '0'?null
                                                :<FormItem className="form-item-right"
                                                           label="吸烟年限">
                                                    {(
                                                        <span className="form-item">{formInfo.smokingYears}年</span>
                                                    )}
                                                </FormItem>
                                        }
                                        {
                                            formInfo.smoking === '0'?null
                                                :<FormItem className="form-item-right form-full-width"
                                                           label="平均每天吸烟量">
                                                    {(
                                                        <span className="form-item">{formInfo.averageDailySmoking}支</span>
                                                    )}
                                                </FormItem>
                                        }                                      
                                        <FormItem className="form-item-right"
                                                  label="最近六个月是否吸烟">
                                            {(
                                                <RadioGroup value={formInfo.smokingsix}>
                                                    <Radio value={"0"}>否</Radio>
                                                    <Radio value={"1"}>是</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="form-sub-left-item">
                                    <div className="form-sub-title">疾病史</div>
                                    <div className="form-sub-content">
                                        <FormItem className="form-item-right form-full-width"
                                                  label="原发性疾病">
                                            {(
                                                <RadioGroup value={formInfo.primaryLungDisease}>
                                                    <Radio value={"0"}>无</Radio>
                                                    <Radio value={"1"}>有，注明：{formInfo.primaryLungDisease === '1'?formInfo.otherPrimaryLungDisease:null}</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right form-full-width"
                                                  label="胸部外伤史">
                                            {(
                                                <RadioGroup value={formInfo.historyOfChestTrauma}>
                                                    <Radio value={"0"}>无</Radio>
                                                    <Radio value={"1"}>有，注明：{formInfo.historyOfChestTrauma === '1'?'：'+formInfo.otherHistoryOfChestTrauma:null}</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right form-full-width"
                                                  label="高血压">
                                            {(
                                                <RadioGroup value={formInfo.hypertension}>
                                                    <Radio value={"0"}>无</Radio>
                                                    <Radio value={"1"}>有</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right form-full-width"
                                                  label="冠心病">
                                            {(
                                                <RadioGroup value={formInfo.coronaryHeartDisease}>
                                                    <Radio value={"0"}>无</Radio>
                                                    <Radio value={"1"}>有</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right form-full-width"
                                                  label="糖尿病">
                                            {(
                                                <RadioGroup value={formInfo.diabetes}>
                                                    <Radio value={"0"}>无</Radio>
                                                    <Radio value={"1"}>有</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right form-full-width"
                                                  label="恶性肿瘤">
                                            {(
                                                <RadioGroup value={formInfo.malignantTumor}>
                                                    <Radio value={"0"}>无</Radio>                                                   
                                                    <Radio value={"1"}>有，注明：{formInfo.malignantTumor === '1'?formInfo.otherMalignantTumor:null}</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="肺结核病史">
                                            {(
                                                <div className="form-item-box">
                                                    <FormItem className="form-item-right"
                                                              label="痰涂片">
                                                        {(
                                                            <RadioGroup value={formInfo.sputumSmear}>
                                                                <Radio value={"0"}>阴性</Radio>
                                                                <Radio value={"1"}>阳性</Radio>
                                                            </RadioGroup>
                                                        )}
                                                    </FormItem>
                                                    <FormItem className="form-item-right"
                                                              label="Xpert">
                                                        {(
                                                            <RadioGroup value={formInfo.Xpert}>
                                                                <Radio value={"0"}>阴性</Radio>
                                                                <Radio value={"1"}>阳性</Radio>
                                                            </RadioGroup>
                                                        )}
                                                    </FormItem>
                                                    <FormItem className="form-item-right"
                                                              label="目前是否治愈">
                                                        {(
                                                            <RadioGroup value={formInfo.healing}>
                                                                <Radio value={"0"}>否</Radio>
                                                                <Radio value={"1"}>是</Radio>
                                                            </RadioGroup>
                                                        )}
                                                    </FormItem>
                                                </div>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="其他病史：">
                                            {(
                                                <span className="form-item">{formInfo.otherMedicalHistory}</span>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="form-sub-left-item">
                                    <div className="form-sub-title">血培养</div>
                                    <div className="form-sub-content">
                                        <FormItem className="form-item-right"
                                                  label="血培养">
                                            {(
                                                <RadioGroup value={formInfo.bloodCulture}>
                                                    <Radio value={"0"}>阴性</Radio>
                                                    <Radio value={"1"}>阳性，注明：{formInfo.bloodCultureNote}</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="form-sub-left-item">
                                    <div className="form-sub-title">转运</div>
                                    <div className="form-sub-content">
                                        <FormItem className="form-item-right"
                                                  label="转运时间">
                                            {(
                                                <span className="form-item">{formInfo.transitTime}小时</span>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-full-width"
                                                  label="是否使用绿色通道">
                                            {(
                                                <RadioGroup value={formInfo.greenChannel}>
                                                    <Radio value={"0"}>否</Radio>
                                                    <Radio value={"1"}>是</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        {/*缺少*/}
                                        <FormItem className="form-item-right"
                                                  label="转运方式（多选）">
                                            {(
                                                <CheckboxGroup options={zhuanyunArr} value={formInfo.transferMode?JSON.parse(formInfo.transferMode):[]}/>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                            </div>
                            <div className="form-sub-right">
                                <div className="form-sub-left-item">
                                    <div className="form-sub-title">血型</div>
                                    <div className="form-sub-content">
                                        <FormItem className="form-item-right"
                                                  label="ABO血型">
                                            {(
                                                <RadioGroup value={formInfo.ABOblood}>
                                                    <Radio value={"0"}>A型</Radio>
                                                    <Radio value={"1"}>B型</Radio>
                                                    <Radio value={"2"}>O型</Radio>
                                                    <Radio value={"3"}>AB型</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-full-width"
                                            label="RH血型">
                                            {(
                                                <RadioGroup value={formInfo.RHblood}>
                                                    <Radio value={"0"}>阴性</Radio>
                                                    <Radio value={"1"}>阳性</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="form-sub-left-item">
                                    <div className="form-sub-title">HLA分型</div>
                                    <div className="form-sub-content">
                                        <FormItem className="form-item-right"
                                                  label="方法">
                                            {(
                                                <RadioGroup value={formInfo.HLATypingMethod}>
                                                    <Radio value={"0"}>方法学</Radio>
                                                    <Radio value={"1"}>DNA</Radio>
                                                    {/*缺少*/}
                                                    <Radio value={"2"}>其他，注明：{formInfo.otnerHLATypingMethod}</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <div>
                                            <FormItem className="form-item-right "
                                                      label="A1">
                                                {(
                                                    <span className="form-item">{formInfo.A1}</span>
                                                )}
                                            </FormItem>
                                            <FormItem className="form-item-right "
                                                      label="B1">
                                                {(
                                                    <span className="form-item">{formInfo.B1}</span>
                                                )}
                                            </FormItem>
                                            <FormItem className="form-item-right "
                                                      label="DR1">
                                                {(
                                                    <span className="form-item">{formInfo.DR1}</span>
                                                )}
                                            </FormItem>
                                        </div>
                                        <div>
                                            <FormItem className="form-item-right"
                                                      label="A2">
                                                {(
                                                    <span className="form-item">{formInfo.A2}</span>
                                                )}
                                            </FormItem>
                                            <FormItem className="form-item-right"
                                                      label="B2">
                                                {(
                                                    <span className="form-item">{formInfo.B2}</span>
                                                )}
                                            </FormItem>
                                            <FormItem className="form-item-right"
                                                      label="DR2">
                                                {(
                                                    <span className="form-item">{formInfo.DR2}</span>
                                                )}
                                            </FormItem>
                                        </div>
                                        <div>
                                            <FormItem className="form-item-right "
                                                      label="其他HLA分型信息">
                                                {(
                                                    <span className="form-item">{formInfo.otherHLA}</span>
                                                )}
                                            </FormItem>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-sub-left-item">
                                    <div className="form-sub-title">血清学指标</div>
                                    <div className="form-sub-content">
                                        <FormItem className="form-full-width"
                                                  label="HIV">
                                            {(
                                                <RadioGroup value={formInfo.HIV}>
                                                    <Radio value={"0"}>阴性</Radio>
                                                    <Radio value={"1"}>阳性</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="CMV">
                                            {(
                                                <div className="form-item-box">
                                                    <FormItem label="lgG">
                                                        {(
                                                            <RadioGroup value={formInfo.igG_CMV}>
                                                                <Radio value={"0"}>阴性</Radio>
                                                                <Radio value={"1"}>阳性</Radio>
                                                            </RadioGroup>
                                                        )}
                                                    </FormItem>
                                                    <FormItem label="lgM">
                                                        {(
                                                            <RadioGroup value={formInfo.igM_CMV}>
                                                                <Radio value={"0"}>阴性</Radio>
                                                                <Radio value={"1"}>阳性</Radio>
                                                            </RadioGroup>
                                                        )}
                                                    </FormItem>
                                                    <FormItem label="DNA">
                                                        {(
                                                            <span className="form-item">{formInfo.DNA_CMV} cop/ml</span>
                                                        )}
                                                    </FormItem>
                                                </div>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="HBV">
                                            {(
                                                <div className="form-item-box">
                                                    <FormItem label="表面抗原">
                                                        {(
                                                            <RadioGroup value={formInfo.surfaceAntigen}>
                                                                <Radio value={"0"}>阴性</Radio>
                                                                <Radio value={"1"}>阳性</Radio>
                                                            </RadioGroup>
                                                        )}
                                                    </FormItem>
                                                    <FormItem label="核心抗体">
                                                        {(
                                                            <RadioGroup value={formInfo.coreAntibody}>
                                                                <Radio value={"0"}>阴性</Radio>
                                                                <Radio value={"1"}>阳性</Radio>
                                                            </RadioGroup>
                                                        )}
                                                    </FormItem>
                                                    <FormItem label="DNA">
                                                        {(
                                                            <span className="form-item">{formInfo.DNA_HBV} cop/ml</span>
                                                        )}
                                                    </FormItem>
                                                </div>
                                            )}
                                        </FormItem>
                                        {/*缺少*/}
                                        <FormItem className="form-item-right"
                                                  label="HCV">
                                            {(
                                                <div className="form-item-box">
                                                    <FormItem label="抗体筛查">
                                                        {(
                                                            <RadioGroup value={formInfo.antibodyScreening}>
                                                                <Radio value={"0"}>阴性</Radio>
                                                                <Radio value={"1"}>阳性</Radio>
                                                            </RadioGroup>
                                                        )}
                                                    </FormItem>
                                                    <FormItem label="RIBA检测">
                                                        {(
                                                            <RadioGroup value={formInfo.RIBA}>
                                                                <Radio value={"0"}>阴性</Radio>
                                                                <Radio value={"1"}>阳性</Radio>
                                                            </RadioGroup>
                                                        )}
                                                    </FormItem>
                                                    <FormItem label="RNA">
                                                        {(
                                                            <span className="form-item">{formInfo.RNA} cop/ml</span>
                                                        )}
                                                    </FormItem>
                                                </div>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="EBV">
                                            {(
                                                <div className="form-item-box">
                                                    <FormItem label="lgG">
                                                        {(
                                                            <RadioGroup value={formInfo.igG_EBV}>
                                                                <Radio value={"0"}>阴性</Radio>
                                                                <Radio value={"1"}>阳性</Radio>
                                                            </RadioGroup>
                                                        )}
                                                    </FormItem>
                                                    <FormItem label="lgM">
                                                        {(
                                                            <RadioGroup value={formInfo.igM_EBV}>
                                                                <Radio value={"0"}>阴性</Radio>
                                                                <Radio value={"1"}>阳性</Radio>
                                                            </RadioGroup>
                                                        )}
                                                    </FormItem>
                                                    <FormItem label="DNA">
                                                        {(
                                                            <span className="form-item">{formInfo.DNA_EBV} cop/ml</span>
                                                        )}
                                                    </FormItem>
                                                </div>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="TPHA">
                                            {(
                                                <RadioGroup value={formInfo.TPHA}>
                                                    <Radio value={"0"}>阴性</Radio>
                                                    <Radio value={"1"}>阳性</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="RPR">
                                            {(
                                                <RadioGroup value={formInfo.RPR}>
                                                    <Radio value={"0"}>阴性</Radio>
                                                    <Radio value={"1"}>阳性</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="form-sub-left-item">
                                    <div className="form-sub-title">感染指标</div>
                                    <div className="form-sub-content">
                                        <FormItem className="form-item-right"
                                                  label="WBC">
                                            {(
                                                <span className="form-item">{formInfo.WBC} <span className="otherCon">*10<span className="sub">9</span></span>/L</span>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="CRP">
                                            {(
                                                <span className="form-item">{formInfo.CRP} mg/L</span>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="PCT">
                                            {(
                                                <span className="form-item">{formInfo.PCT} ug/L</span>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="form-sub-left-item">
                                    <div className="form-sub-title">细菌痰培养</div>
                                    <div className="form-sub-content">
                                        <FormItem className="form-item-right form-full-width"
                                                  label="鲍曼不动杆菌">
                                            {(
                                                <RadioGroup value={formInfo.acinetobacterBauman}>
                                                    <Radio value={"0"}>阴性</Radio>
                                                    <Radio value={"1"}>阳性</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right form-full-width"
                                                  label="肺炎克雷伯菌">
                                            {(
                                                <RadioGroup value={formInfo.klebsiellaPneumoniae}>
                                                    <Radio value={"0"}>阴性</Radio>
                                                    <Radio value={"2"}>阳性</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right form-full-width"
                                                  label="铜绿假单细胞">
                                            {(
                                                <RadioGroup value={formInfo.pseudomonasAeruginosa}>
                                                    <Radio value={"0"}>阴性</Radio>
                                                    <Radio value={"1"}>阳性</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right form-full-width"
                                                  label="大肠杆菌">
                                            {(
                                                <RadioGroup value={formInfo.escherichiaColi}>
                                                    <Radio value={"0"}>阴性</Radio>
                                                    <Radio value={"1"}>阳性</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right form-full-width"
                                                  label="耐甲氧西林金黄色葡萄球菌">
                                            {(
                                                <RadioGroup value={formInfo.methicillinResistantGold}>
                                                    <Radio value={"0"}>阴性</Radio>
                                                    <Radio value={"1"}>阳性</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="其他，注明：">
                                            {(
                                                <span className="form-item">{formInfo.sputumCultureOfOtherBacteria} </span>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="form-sub-left-item">
                                    <div className="form-sub-title">真菌痰培养</div>
                                    <div className="form-sub-content">                                        
                                        <FormItem className="form-full-width"
                                                  label="丝状真菌">
                                            {(
                                                <RadioGroup value={formInfo.filamentous}>
                                                    <Radio value={"0"}>阴性</Radio>
                                                    <Radio value={"1"}>阳性</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right"
                                                  label="白色念珠菌">
                                            {(
                                                <RadioGroup value={formInfo.candidaAlbicans}>
                                                    <Radio value={"0"}>阴性</Radio>
                                                    <Radio value={"1"}>阳性</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right form-full-width"
                                                  label="其他，注明：">
                                            {(
                                                <span className="form-item">{formInfo.sputumCultureOfOtherFungi} </span>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="form-sub-left-item">
                                    <div className="form-sub-title">热缺血时间及灌注液</div>
                                    <div className="form-sub-content">
                                        <FormItem className="form-item-right form-full-width"
                                                  label="热缺血时间">
                                            {(
                                                <span className="form-item">{formInfo.warmIschemiaTime}min</span>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right form-full-width"
                                                  label="灌注液">
                                            {(
                                                <RadioGroup value={formInfo.perfusate}>
                                                    <Radio value={"0"}>UW液</Radio>
                                                    <Radio value={"1"}>Collin液</Radio>
                                                    <Radio value={"2"}>HC-A</Radio>
                                                    <Radio value={"3"}>LPD液</Radio>
                                                    <Radio value={"4"}>其他，注明：{formInfo.perfusateNote}</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right form-full-width"
                                                  label="顺灌量">
                                            {(
                                                <span className="form-item">{formInfo.shunguanliang} ml</span>
                                            )}
                                        </FormItem>
                                        <FormItem className="form-item-right form-full-width"
                                                  label="逆灌量">
                                            {(
                                                <span className="form-item">{formInfo.niguanliang} ml</span>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-sub-end-content">
                            <div className="form-sub-end-item">
                                <FormItem className="right"
                                          label="日期">
                                    {(
                                        <span className="form-item">{this.props.timestampToTime(row.submit_time,'y-m-d')}</span>
                                    )}
                                </FormItem>
                                <FormItem className="right"
                                          label={"表单填写人员"}>
                                    {(
                                        <span className="form-item">{row.submit_person}</span>
                                    )}
                                </FormItem>
                            </div>
                            {/*<div className="form-sub-end-item">*/}
                                {/*<FormItem className="right"*/}
                                          {/*label="日期">*/}
                                    {/*{(*/}
                                        {/*<span className="form-item">{this.props.timestampToTime(row.review_time,'y-m-d')}</span>*/}
                                    {/*)}*/}
                                {/*</FormItem>*/}
                                {/*<FormItem className="right"*/}
                                          {/*label={"表格填审核人员"}>*/}
                                    {/*{(*/}
                                        {/*<span className="form-item">{row.reviewer}</span>*/}
                                    {/*)}*/}
                                {/*</FormItem>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </Form>
                {tabIndex === '1'?
                    <div className="drawer-footer">
                        <Button key="submit" type="primary" className="btn-right"
                                onClick={()=>this.onFormSubmit('1')}>
                            通过
                        </Button>
                        <Button key="back" onClick={()=>this.onFormSubmit('2')}>退回</Button>
                    </div>
                    :tabIndex === '2'?
                        <div className="drawer-footer">
                            <Button key="submit" type="primary" className="btn-right"
                                    onClick={()=>this.onFormSubmit('3')}>
                                导出
                            </Button>
                        </div>
                        :null}
            </Drawer>
        )
    }
}
DrawerForm = Form.create()(DrawerForm);

function mapStateToProps(state) {
    return {
        qualityDoc:state.qualityDoc
    }
}
export default connect(mapStateToProps)(DrawerForm);
