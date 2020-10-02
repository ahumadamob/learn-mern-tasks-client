import React from 'react';
import FrmProject from '../projects/FrmProject';
import ListProjects from '../projects/ListProjects';
const Sidebar = () => {
    return ( 
        <aside>
            <h1>MERN<span>Tasks</span></h1>
            <FrmProject />

            <div className="proyectos">
                <h2>Mis Proyectos</h2>
                <ListProjects />
            </div>
        </aside>
     );
}
 
export default Sidebar;