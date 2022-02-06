import React, {useContext, Fragment} from 'react';
import './Layout.css'

//components
import NuevoProyecto from '../proyectos/NuevoProyecto';
import ListadoProyecto from '../proyectos/ListadoProyecto';

//Context mobile
import mobileContext from '../../context/menuMobile/mobileContext';

const Sidebar = () => {

    //Extraer el context de mobile
    const MobileContext = useContext(mobileContext);
    const {menuMobile, ocultarMenu} = MobileContext;

    return ( 
        
        <Fragment>
            <aside className= {`side-bar ${menuMobile ? '' : 'disabled'}`}>

                <h1>MERN Tasks</h1>
                
                <hr/>

                <NuevoProyecto/>

                <hr/>

                <div className="proyectos">

                    <h2>Mis Proyectos</h2>
                    <ListadoProyecto/>
                    
                </div>

                

            </aside>

            <div className={`sombreado ${menuMobile ? '' : 'disabled'}`} onClick={() => ocultarMenu()}></div>

        </Fragment>

    );
}

export default Sidebar;