import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Route } from 'react-router-dom';
import SleepPage from '../../pages/geral/sleep/SleepPage';
import Unauthorized from '../../pages/geral/unauthorized/UnautorizedPage';
import { validateToken } from '../../actions/geral/actions';
import { checkPermission } from '../../services/checkPermissions';
import SistemaDeAbas from '../../pages/homeControl/sistemaDeAbas';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, validToken } = rest.login;
  const [janelas, setJanelas] = React.useState([]);
  useEffect(async () => {
    if (user) {
      rest.validateToken(user.token);
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user && validToken) {
          if (checkPermission(props.location.pathname)) {
            // janelas.push(props)
           
            return (
           
                  <Component {...props} />
         
            )
          } else {
            return (<Unauthorized />)
          }
        } else if ((user && !validToken) || (!user && validToken)) {
          return (<SleepPage />)
        } else {
          return (<Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />)
        }
      }
      }
    />
  );
};

const mapStateToProps = (state) => ({ login: state.login });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ validateToken }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
