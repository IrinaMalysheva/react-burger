import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export function ProtectedRoute({ children, ...rest }) {
    const { isLoggedIn } = useSelector(store => store.authRegister);

    return (
        <Route
            {...rest}
            render={({ location }) => (
                isLoggedIn
                ? (children)
                : (<Redirect to={{ pathname: '/login', state: { from: location } }} />)
            )}
        />
    );
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ProtectedRoute;