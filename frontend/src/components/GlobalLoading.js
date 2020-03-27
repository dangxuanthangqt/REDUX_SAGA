import React, { Component } from 'react';
import Loading from "../assets/image/loading.gif"
import { connect } from 'react-redux';
export class GlobalLoading extends Component {
    render() {

        var xhtml = <div></div>;
        var { showLoading } = this.props;
      
        if (showLoading) {
            xhtml = <div style={{
                        background: 'rgba(0,0,0,0.4)',
                        zIndex: 99
                    }} className="w-100 h-100 position-fixed d-flex justify-content-center align-items-center ">
                        <div>
                            <img className="float-none" width={300} height={200} src={Loading} alt="Loading..." />
                        </div>
        
                    </div>
                
            
        }

        return xhtml;
           
    
    }
}
const mapStateToProps = state => {
    return {
        showLoading: state.ux.showLoading
    }
}
export default connect(mapStateToProps, null)(GlobalLoading);
