import React, { Component } from 'react';
import Hearder from './Hearder';

import { Link } from 'react-router-dom';
import Drawer from './Drawer';



export class Dashboard extends Component {
    render() {
       
        return (
            <div className="bmd-layout-container bmd-drawer-f-l ">
                <Hearder>
                </Hearder>
 
                <Drawer>
                    
                </Drawer>
             
                
                <main className="bmd-layout-content ">
                    <div className=" container mt-3">
                        {
                            this.props.children
                        }
                    </div>

                </main>
            </div>


        );
    }
}

export default Dashboard;
