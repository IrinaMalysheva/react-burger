import { FC } from 'react';
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useSelector } from '../../services/hooks';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
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