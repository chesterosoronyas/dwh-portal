import React from "react";
import Loadable from 'react-loadable';
import { AppFooter, AppHeader, AppBreadcrumb2 as AppBreadcrumb } from '@coreui/react';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LOADING_DELAY } from './../../constants';
import * as router from 'react-router-dom';
import Loading from './../../views/Shared/Loading';
import PrivateRoute from './../../utils/protectedRoute';
import routes from './../../routes';
import UniversalFilter from './../../views/Shared/UniversalFilter';
import CovidFilter from './../../views/Shared/CovidFilter';

const DefaultFooter = Loadable({ loader: () => import('./DefaultFooter'), loading: Loading, delay: LOADING_DELAY });
const DefaultHeader = Loadable({ loader: () => import('./DefaultHeader'), loading: Loading, delay: LOADING_DELAY });

const DefaultLayout = () => {
    const ui = useSelector(state => state.ui)
    const ctTab = useSelector(state => state.ui.ctTab);


    return (
        <div className="app">
            <AppHeader fixed>
                <DefaultHeader />
            </AppHeader>
            <Container fluid className={ui.stickyFilter === true ? 'stickyUniversalFilter':'hiddenUniversalFilter'}>
                {ctTab !== 'covid' ? <UniversalFilter/> :<CovidFilter/>}
            </Container>
            <div className="app-body">
                <main className={"main"}>
                    <AppBreadcrumb appRoutes={routes} router={router} />
                    <Container fluid>
                        <Switch>
                            {routes.map((route, idx) => {
                                return route.component ? (
                                    route.private ? <PrivateRoute
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={props => (
                                                <route.component {...props}/>
                                            )} /> :
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        render={props => (
                                            <route.component {...props}/>
                                        )} />
                                ) : (null);
                            })}
                        </Switch>
                    </Container>
                </main>
            </div>
            <AppFooter>
                <DefaultFooter />
            </AppFooter>
        </div>
    );
}

export default DefaultLayout;
