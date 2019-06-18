import React,{Component} from 'react';
import {connect} from "react-redux";
import { Table,Divider,Modal,Button,Input,Form,message} from 'antd';
import DrawertForm from '../form/index';
import PackJson from '../../../../../package.json';
import './index.less'
const { TextArea } = Input;
const FormItem = Form.Item;

class Tables extends Component{
    constructor(props){
        super(props)
        this.state = {
            sortOrder:'descend',
            visible:false,
            type:0,//1通过2导出
            current:1,
            pageSize:10,
            formVisible:false,
            formTitle:'肺移植注册表2',
            backType:'1',//1:填写退回理由2：查看退回理由
            reason:'',
            formInfo:{},//表格信息
            row:{},
            formId:0,//表单id
            passVisible:false
        }
    }

    //table的操作：查看退回理由，退回，通过，导出
    onActionClick = (row,type) =>{
        if(type === 'formName'){//查看表单
            this.setState({
                formVisible:true,
                formTitle:row.content_title,
                formInfo:row.content_json,
                row:row,
                formId:row.id
            })
        }else if(type === 'reback'){//退回
            this.setState({
                visible:true,
                backType:'1',
                formId:row.id,
            })
        }else if(type === 'reason'){//查看退回理由
            this.setState({
                visible:true,
                reason:row.back_reason,
                backType:'2'
            })
        }else if(type === 'export'){//导出
            this.setState({
                type:2,
                passVisible:true,
                formId:row.id,
            })
        }else if(type === 'pass'){//通过
            this.setState({passVisible:true,formId:row.id,formVisible:false,type:1})
        }
    }

    getPassOrBack = (data) =>{
        this.props.dispatch({
            type:'QUALITYDOC_PASS_OR_BACK_SET',
            data:data,
            callBack:(res)=>{
                this.closeModal();
                message.success('操作成功');
                this.props.getList(this.props.tabIndex,{pageNum:this.state.current,pageSize:this.state.pageSize});
            }
        })
    }
    closeModal = () => {
        let backType = this.props.tabIndex === '1'?"1":"2"
        this.setState({
            visible:false,
            formVisible:false,
            backType:backType,
            formTitle:'',
            formInfo:{},
            row:{},
            // type:0,
            formId:0,
            reason:"",
            passVisible:false
        })
    }
    //退回理由提交
    onSubmit = () =>{
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.getPassOrBack({
                    operateFlag:"1",
                    id:this.state.formId,
                    backReason:values.reason,
                })
            }
        });
    }

    onPageChange = (current,pageSize) =>{
        this.setState({
            current,pageSize
        });
        this.props.getList(this.props.tabIndex,{pageNum:current,pageSize:pageSize});
    }
    onShowSizeChange = (current,pageSize) =>{
        this.setState({
            current,pageSize
        })
        this.props.getList(this.props.tabIndex,{pageNum:current,pageSize:pageSize});
    }
    //table的排序方式修改
    onHeaderRow = () =>{
        const {sortOrder} = this.state;
        let sortType = 'descend';
        if(sortOrder === 'descend'){
            sortType = 'ascend';
        }
        this.setState({
            sortOrder:sortType
        })
    }
    onPassOk = () =>{
        const {type} = this.state;
        if(type === 1){//通过
            this.getPassOrBack({
                operateFlag:"0",
                id:this.state.formId
            })
        }else if(type === 2){
            let formIds = [this.state.formId].toString();
            window.open(PackJson.proxy + axios.baseIp + '/exportSinglePdf?formIds='+formIds,'_self');
            this.closeModal();
        }
    }
    render(){
        const {sortOrder,current,visible, formVisible,formTitle,backType,reason,formInfo,row,formId,pageSize,passVisible,type} = this.state;
        const {tabIndex,dataSource,load,total} = this.props;
        const { getFieldDecorator } = this.props.form;
        const columns = [{
            title: '提交时间',
            dataIndex: 'submit_time',
            defaultSortOrder: 'descend',
            sortOrder:sortOrder,
            sorter: (a, b) => a.submit_time - b.submit_time,
            render:(text)=>{
                return (
                    <span>{this.props.timestampToTime(text)}</span>
                )
            },
        }, {
            title: '提交医生',
            dataIndex: 'submit_person',
        }, {
            title: '表单名',
            dataIndex: 'content_title',
            render:(text,row,index)=>{
                return(
                    <span className="formName" onClick={()=>this.onActionClick(row,'formName')}>{text}</span>
                )
            }
        },{
            title: '受体信息',
            dataIndex: 'recipientName',
            render:(text,row)=>{
                return (
                    <span>{row.content_json.recipientName || ''}</span>
                )
            }
        },{
            title: '供体信息',
            dataIndex: 'donnerInfo',
            render:(text,row)=>{
                return (
                    <div >
                        <span>{row.content_json.name || ""}</span>
                        <Divider type="vertical" className="line"/>
                        <span>{row.content_json.sex === '0'?"男":row.content_json.sex === "1"?"女":""}</span>
                        <Divider type="vertical" className="line"/>
                        <span>{row.content_json.age? row.content_json.age + '岁':""}</span>
                    </div>
                )
            }
        },{
            title: '状态',
            dataIndex: 'status',
            render:()=>{
                if(this.props.tabIndex === '2'){
                    return (
                        <span className="passColor">已通过</span>
                    )
                }else if(this.props.tabIndex === '1'){
                    return (
                        <span className="passColor">待审核</span>
                    )
                }else{
                    return (
                        <span className="backColor">已退回</span>
                    )
                }
            }
        },{
            title: '操作',
            dataIndex: 'action',
            render:(text,row,index)=>{
                if(this.props.tabIndex === '1'){//待审核
                    return (
                        <div className="action">
                            <span className="actionItem" onClick={()=>this.onActionClick(row,'pass')}>通过</span>
                            <Divider type="vertical" className="lineColor"/>
                            <span className="actionItem" onClick={()=>this.onActionClick(row,'reback')}>退回</span>
                        </div>
                    )
                }else if(this.props.tabIndex === '2'){//已通过
                    return (
                        <div className="action">
                            <span className="actionItem export" onClick={()=>this.onActionClick(row,'export')}>导出PDF</span>
                        </div>
                    )
                }else if(this.props.tabIndex === '3'){//已退回
                    return (
                        <div className="action">
                            <span className="actionItem" onClick={()=>this.onActionClick(row,'reason')}>查看退回理由</span>
                        </div>
                    )
                }
            }
        } ];
        const pagination = {
            current:current,
            pageSize:pageSize,
            total:total || 0 ,
            showQuickJumper:true,
            showSizeChanger:true,
            showTotal:(total)=>(`共 ${total|| 0 } 条`),
            onChange:this.onPageChange,
            onShowSizeChange:this.onShowSizeChange
        }

        return(
            <div id="table" className="table">
                <Table columns={columns} dataSource={dataSource} rowKey="id"
                       onHeaderRow={(column) => {
                           return {
                               onClick: () => this.onHeaderRow(column)
                           };
                       }}
                       pagination={pagination}/>
                <Modal className="modal-box"
                       title="退回理由"
                       visible={visible}
                       onOk={this.onBackReasonOk}
                       onCancel={this.closeModal}
                       footer={backType === '1'?
                           [
                               <Button key="submit" type="primary" htmlType="submit" loading={load} onClick={this.onSubmit}>
                                   退回
                               </Button>,
                               <Button key="back" onClick={this.closeModal}>取消</Button>,
                           ]:null}>
                    <Form>
                        <FormItem onSubmit={this.onSubmit}>
                            {getFieldDecorator("reason",{
                                initialValue:backType === '1'?"":reason,
                                rules: [{
                                    required:true,message:"必填项"
                                }],
                            })(
                                <TextArea placeholder="请输入退回理由"
                                          className="reasonText"
                                          rows={6}
                                          disabled={backType === '1'?false:true}>
                                </TextArea>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
                <DrawertForm id="form"
                             formTitle={formTitle}
                             tabIndex={tabIndex}
                             formVisible={formVisible}
                             formInfo={formInfo}
                             row={row}
                             formId={formId}
                             timestampToTime={this.props.timestampToTime}
                             onReBack={this.onActionClick}
                             onCloseDrawer={this.closeModal}>
                </DrawertForm>
                {/*通过或导出*/}
                <Modal  title=''
                        className='modal-box exit-account-modal'
                        visible={passVisible}
                        onCancel={this.closeModal}
                        footer={[]}>
                    <h6 className='exit-account-title'>
                        <i className='exit-account-icon'></i>
                        {type === 1?"您确定要通过吗？":"您确定要导出吗？"}</h6>
                    <div className='exit-modal-footer'>
                        <Button key='submit'
                                type='primary'
                                className='admin-btn-primary'
                                loading={load || false}
                                onClick={this.onPassOk}>确定</Button>
                        <Button key='back'
                                className='admin-btn-normal'
                                onClick={this.closeModal}>取消</Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

Tables = Form.create()(Tables);
function mapStateToProps(state) {
    return {
        qualityDoc:state.qualityDoc
    }
}
export default connect(mapStateToProps)(Tables);