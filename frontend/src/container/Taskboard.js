import React, { Component } from 'react';
import  STATUS  from '../constants/STATUS';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showModal } from '../actions/modal';
import * as actonCreators from '../actions/task';

import SearchBox from '../components/SearchBox';

import ModalFormik from '../components/ModalFormik';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
// var listTasks = [
//     {
//         id: "1",
//         title: "abc",
//         description: " 111111111111111111111",
//         status: 1
//     },
//     {
//         id: "2",
//         title: "abrerewc",
//         description: " 33333333333333333333333",
//         status: 2
//     },
//     {
//         id: "3",
//         title: "awererwbc",
//         description: " 4444444444444444",
//         status: 0
//     },
//     {
//         id: "4",
//         title: "awerwerbc",
//         description: " 4444444444444444444444",
//         status: 1
//     },

// ]




 class Taskboard extends Component {


    componentDidMount = () => {
        var { actionCreators } = this.props;
        var { fetchListTask } = actionCreators;
        fetchListTask();
    }


    showtaskboard = () => {
        var result = [];
        var { listTasks } = this.props;
        result = STATUS.map((status, index) => {
            var eachStatus = listTasks.filter(Element => status.value === Element.status)
            return <div key={index} className="col-sm-4">
                <h2 className="text-center">{status.lable}</h2>
                {
                    eachStatus.map((e, index) => {
                        return (
                            <div key={index} className="card rounded mb-3 bg-light">

                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="card-title">{e.title}</h6>
                                        <h6 className="card-title">{status.lable}</h6>

                                    </div>

                                    <p className="card-text">{e.description}</p>
                                    <div className="float-right">

                                        <button 
                                         onClick={() => { this.handleOnClickModal("Chỉnh sửa", e) }}
                                        type="button" className="btn btn-primary bmd-btn-fab">
                                            <i className="fa fa-pencil" aria-hidden="true" />

                                        </button>

                                        &nbsp;
                                        <span className="btn-group-sm">
                                        <button
                                         onClick={() => { this.handleOnClickDelete(e._id) }}
                                            type="button" className="btn btn-danger bmd-btn-fab">
                                            <i className="fa fa-trash" aria-hidden="true" />

                                        </button>

                                        </span>

                                        

                                    </div>

                                </div>



                            </div>)


                    })
                }
            </div>
        })
        return result;
    }

    handleOnChange = (value) => {
        this.props.actionCreators.filterTask(value);
    }
    handleOnClickModal = (title, editing) => {

        this.props.showModal(title, editing);
    }
    handleOnClickDelete = (id) => {
        if (window.confirm("Do you want to delete Task item ?")) {
            this.props.actionCreators.deleteTask(id)
        }

    }
    render() {
       
        return (
            <div className="w-100 h-100">
               
                <div>
                    <button
                        onClick={() => { this.handleOnClickModal("Thêm mới công việc", null) }}

                        type="button" className="btn btn-primary mb-5 btn-raised"><i className="fa fa-plus" aria-hidden="true"></i> &nbsp; Thêm công việc</button>
                    {/* <ModalForm></ModalForm> */}
                    <ModalFormik></ModalFormik>
                    <SearchBox handleOnChange={this.handleOnChange}></SearchBox>
                    <div className=" row">
                        {this.showtaskboard()}

                    </div>
                </div>

            </div>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        listTasks: state.tasks.list_tasks
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actionCreators: bindActionCreators(actonCreators, dispatch),
        showModal: (title, editing) => {
            dispatch(showModal(title, editing))
        }
    }
}
export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Taskboard));
