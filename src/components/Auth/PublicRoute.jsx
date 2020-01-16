import React from 'react';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import Loading from '../Layout/Loading';

const locationHelper = locationHelperBuilder({});

const PublicRoute = connectedRouterRedirect({
    wrapperDisplayName: 'UserIsNotAuthenticated',
    AuthenticatingComponent: <Loading/>,
    allowRedirectBack: false,
    redirectPath: (state, ownProps) =>
      locationHelper.getRedirectQueryParam(ownProps) || '/books',
    authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
      !auth.isLoaded || isInitializing === true,
    authenticatedSelector: ({ firebase: { auth } }) =>
      auth.isLoaded && auth.isEmpty
});

export default PublicRoute;