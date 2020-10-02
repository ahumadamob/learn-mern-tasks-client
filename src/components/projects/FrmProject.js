import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const FrmProject = () => {

    //Obtener el context
    const frmProjectContext = useContext(projectContext);
    const { showProjectForm, showProjectError, 
        showProjectFormFn, addProjectFn, showProjectErrorFn         
    } = frmProjectContext;

    const [frmProjectData, setFrmProjectData] = useState({
        name: ''
    });

    const { name } = frmProjectData;

    const handleChange = e => {
        setFrmProjectData({
            ...frmProjectData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        //Validaciones del formulario
        if(name === ''){
            showProjectErrorFn();
            return;
        }

        //Agregar al State
        addProjectFn(frmProjectData);

        //Limpiar el formulario
        setFrmProjectData({
            name: ''
        })

    }

    const handleClick = e => {
        showProjectFormFn();
    }

    return ( 
        <Fragment>
            
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={handleClick}
            >Nuevo Proyecto</button>

            {showProjectForm ? (
                <form
                    className="formulario-nuevo-proyecto" 
                    onSubmit={handleSubmit}               
                >
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre del Proyecto"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    /> 

                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Agregar Proyecto"
                    />                    

                </form>
            )
            : null
            }
            { showProjectError ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null }


        </Fragment>
     );
}
 
export default FrmProject;