import React from 'react';
import './Layout.css'

//components
import NuevoProyecto from '../proyectos/NuevoProyecto';
import ListadoProyecto from '../proyectos/ListadoProyecto';

const Sidebar = () => {
    return ( 
        <aside className='side-bar'>

            <h1>MERN Tasks</h1>
            
            <hr/>

            <NuevoProyecto/>

            <hr/>

            <div className="proyectos">

                <h2>Mis Proyectos</h2>
                <ListadoProyecto/>
                
            </div>

        </aside>
    );
}

export default Sidebar;