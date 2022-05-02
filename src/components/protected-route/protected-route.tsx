import { FC } from 'react';
import { Redirect, Route, RouteProps } from "react-router-dom";
import { RootStateOrAny } from 'react-redux';
import { useSelector } from '../../services/hooks';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const { isLoggedIn } = useSelector((store: RootStateOrAny) => store.authRegister);

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