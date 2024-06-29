import React, { Suspense, lazy } from "react";
import { Route, Switch, Router } from "react-router-dom";
import SnackBar from "../../components/snackBar";
import history from "../../utils/history";

const NotFound = lazy(() => import("../../components/notFound"));
const Auth = lazy(() => import("../../components/auth"));
const Home = lazy(() => import("../../components/home"));
const DetailView = lazy(() => import("../../components/detailView"));
const Profile = lazy(() => import("../../components/profile"));
const Admin = lazy(() => import("../../components/admin"));
const LandingPage = lazy(() => import("../../components/landingPage"));
const Privacy = lazy(() => import("../../components/landingPage/privacy"));
const Terms = lazy(() => import("../../components/landingPage/terms"));
const Cookies = lazy(() => import("../../components/landingPage/cookies"));
const BlogHome = lazy(() => import("../../components/blog/Home"));
const LandingLoader = lazy(() => import("../../components/blog/LandingLoader"));
const PodCastDetail = lazy(() => import("../../components/blog/PodCastDetail"));

const Routes = () => (
    <Suspense fallback={<>Loading...</>}>
        <SnackBar />
        <Router history={history}>
            <Switch>
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/privacy-policy" component={Privacy} />
                <Route exact path="/terms-and-conditions" component={Terms} />
                <Route exact path="/cookies-policy" component={Cookies} />
                <Route
                    path="/episodeDetailView/:aid/:bid"
                    component={DetailView}
                />
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/profile" component={Profile} />
                {/* blog Routes */}
                <Route exact path="/blog" component={BlogHome} />
                <Route exact path="/landingLoader" component={LandingLoader} />
                <Route exact path="/podcast/:id" component={PodCastDetail} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    </Suspense>
);

export default Routes;
