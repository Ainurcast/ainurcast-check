import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Home from "./home";

function mapStateToProperties(state, ownProps) {
  const {
    loaderReducer,
    profileReducer: { userDetails }
} = state;

  return {
    routeParams: ownProps?.match?.params,
    showLoader: loaderReducer,
    userDetails,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProperties, mapDispatchToProps)(Home);
