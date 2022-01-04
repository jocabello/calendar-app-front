// import React from 'react'
// import PropTypes from 'prop-types'

// import { Route, Navigate } from 'react-router-dom'

// export const PrivateRoute = ({
//     isAuthenticated,
//     component: Component,
//     ...rest
// }) => {
    
//     // solo tenemos una ruta por lo que no se necesita
//     // localStorage.setItem('lastPath', rest.location.pathname);

//     return (
//         <Route {...rest}
//             component={ (props)=> (
//                 (isAuthenticated)
//                     ? ( <Component {...props} />) // sí está autenticado
//                     : ( <Navigate to="/" />) // no está autenticado
//             )}

//         />
//     )
// }

// PrivateRoute.propTypes = {
//     isAuthenticated: PropTypes.bool.isRequired,
//     component: PropTypes.func.isRequired
// }


import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
 
 
 
const PrivateRoute = ({children}) => {
    
const {uid} = useSelector(state => state.auth)
    return (
        !!uid
        ?   children  
        :  <Navigate to="/login" />
    )              
}
 
 
export default PrivateRoute;