// import React from 'react'
// import { Navigate, Route } from 'react-router'
// import PropTypes from 'prop-types'


// export const PublicRoute = ({
//     isAuthenticated,
//     component: Component,
//     ...rest
// }) => {
//     return (
//         <Route {...rest} 
//             component={ (props) => (
//                 (isAuthenticated)
//                     ? ( <Navigate to="/" /> ) // sí está autenticado
//                     : ( <Component {...props} /> ) // no está autenticado
//             )}
//         />

//     )
// }

// PublicRoute.propTypes = {
//     isAuthenticated: PropTypes.bool.isRequired,
//     component: PropTypes.func.isRequired
// } 

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
 
const PublicRoute = ({children}) => {
    const {uid} = useSelector(state => state.auth)
  
    return ( !!uid
        ? <Navigate to="/" />
        : children 
        
        )
        
}
 
export default PublicRoute;