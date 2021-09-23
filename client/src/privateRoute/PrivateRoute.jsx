import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  auth: { userInfo },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if(userInfo !== null) {
           return  <Component />
        }else{
         return <Redirect to="/login" />
        }  
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
