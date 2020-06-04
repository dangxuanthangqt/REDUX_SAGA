import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/task';
import { withRouter } from 'react-router-dom';
import { createMuiTheme, Grid, withStyles, Typography, Box, Container, Button, TextField, Card, CardContent, CardHeader, CardActions, IconButton } from '@material-ui/core';
import STATUS from '../../constants/STATUS';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { palette } from '@material-ui/system';
import ModalForm from '../../components/Mui_ModalForm/ModalForm';
import { showModal } from '../../actions/modal';
import SearchBox from '../../components/SearchBox';
import Helmet from 'react-helmet';
import { format, compareAsc } from 'date-fns'
// var listTasks = [
//   {
//     id: "1",
//     title: "abc",
//     description: " 111111111111111111111",
//     status: 1
//   },
//   {
//     id: "2",
//     title: "abrerewc",
//     description: " 33333333333333333333333",
//     status: 2
//   },
//   {
//     id: "3",
//     title: "awererwbc",
//     description: " 4444444444444444",
//     status: 0
//   },
//   {
//     id: "4",
//     title: "awerwerbc",
//     description: " 4444444444444444444444",
//     status: 1
//   },

// ]


const Styles = (theme) => ({
  root: {
    height: "100%",
    //  backgroundColor: theme.palette.primary.main
  },
  btnEdit: {
    backgroundColor: theme.palette.success.main,
  },
  btnDelete: {
    backgroundColor: theme.palette.warning.main
  },
  cardAction: {
    justifyContent: 'flex-end'
  }
});
function Mui_TaskBoard(props) {
  useEffect(() => {
    var { actionCreators } = props;
    var { fetchListTask } = actionCreators;
    fetchListTask();

  }, []);
  const showTaskBoard = () => {
    var { listTasks } = props;
    var xhtml;
    xhtml = STATUS.map((Element, index) => {
      var eachTask = listTasks.filter((element, index) => {
        return (Element.value === element.status)
      })
      return <Grid
        item
        
        key={index}
        md={3}

      >
        <Typography variant="h5" className="text-center">
          {
            Element.lable
          }
        </Typography>
        {
          eachTask.map((element, index) => {
            return (
              <Card
                className="bg-primary"
                key={index}
                style={{
                  margin: "10px 0",
                  

                }}>
                <CardHeader
                 
                  title={element.taskName}
                >

                </CardHeader>
                <CardContent>
                  <Typography>
                    startTime: { format(new Date(element.startTime), 'dd/MM/yyyy')}
                  </Typography>
                  <Typography >
                    endTime: { format(new Date(element.endTime), 'dd/MM/yyyy')}
                  </Typography>
                  {/* <Typography variant="h6">
                    startTime: {element.startTime.Stringify}
                  </Typography>
                  <Typography variant="h6">
                    endTime: 
                  </Typography> */}
                  
                </CardContent>
                <CardActions className={classes.cardAction}>
                  <Grid>
                    <IconButton
                      onClick={() => handleDelete(element.taskId)}
                      className={classes.btnDelete} >
                      <DeleteIcon fontSize="small" />
                    </IconButton >
                  &nbsp;
                  <IconButton
                      onClick={() => handleOnClick("EDIT TASK", element)}

                      className={classes.btnEdit} color="primary">
                      <EditIcon fontSize="small"></EditIcon>
                    </IconButton>
                  </Grid>
                </CardActions>
              </Card>
            )
          })
        }


      </Grid>
    })
    return xhtml;
  }
  const handleOnClick = (title, editing) => {
    props.showModal(title, editing)
  }
  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this task?")) {
      props.actionCreators.deleteTask(id);
    }
  }
  const handleOnChange = (value) => {
    props.actionCreators.filterTask(value);
  }

  const { classes } = props;
  return (
    <Container >
      <Helmet>
        <title>Blue Team</title>
      </Helmet>
      <Button
        onClick={() => handleOnClick("ADD TASK", null)}
        style={{ marginTop: 10 }}
        variant="contained"
        color="primary">
        <AddIcon></AddIcon> add task
      </Button>
      <ModalForm></ModalForm>
      <SearchBox handleOnChange={handleOnChange}></SearchBox>

      <Grid container
      // style={
      //   {
          
      //     display: "grid",
      //     gridTemplateColumns:"auto auto auto auto"
      //   }
      // }
        className="mt-5"
        spacing={3}>
        {
          showTaskBoard()
        }

      </Grid>


    </Container>


  );
}
const mapStateToProps = (state) => {
  return {
    listTasks: state.tasks.list_tasks,
    change: state.tasks.change

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actionCreators: bindActionCreators(actionCreators, dispatch),
    showModal: (title, editing) => {
      dispatch(showModal(title, editing))
    }
  }
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
// const withStyle = withStyles(Styles)(Mui_TaskBoard);
// const withRouters = withRouter(Mui_TaskBoard);
//export default connect(mapStateToProps,mapDispatchToProps)(Mui_TaskBoard)
export default compose(
  withStyles(Styles),
  withConnect


)(Mui_TaskBoard);
