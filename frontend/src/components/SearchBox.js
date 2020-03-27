import React, { Component } from 'react';
import { Grid, TextField } from '@material-ui/core';

export class SearchBox extends Component {


    handleOnChange = (event) => {
        var { value } = event.target
        this.props.handleOnChange(value)
    }
    render() {
        return (



            <Grid item style={{ marginTop: 10 }} md={5}>
                <TextField fullWidth
                    onChange={this.handleOnChange}
                    placeholder="Filter"
                >
                </TextField>
            </Grid>




        );
    }
}

export default SearchBox;
