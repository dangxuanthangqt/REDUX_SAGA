import React, { Component } from 'react';
import { Link} from 'react-router-dom';
export class Drawer extends Component {
    render() {
        return (
            <div id="dw-s1" className="bmd-layout-drawer bg-faded h-100">
                <header>
                    <div className="navbar-brand">Title</div>
                </header>
                <ul className="list-group h-100">
                    <Link className="list-group-item" to="/" >Trang chủ</Link>
                    <Link to="/task-board" className="list-group-item">Task board</Link>
                 
                </ul>
            </div>

        );
    }
}

export default Drawer;
