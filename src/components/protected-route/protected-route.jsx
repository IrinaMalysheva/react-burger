import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getCookie } from '../../utils/utils';

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