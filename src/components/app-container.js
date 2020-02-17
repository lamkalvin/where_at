import React from 'react';
import styled from 'styled-components';
import Settings from '../routes/settings';
import ViewSpace from '../routes/view-space';
import Search from '../routes/search';
import Favorites from "../routes/favorites";
import SearchResults from '../routes/search-results';
import {
    Switch,
    Route,
    withRouter
} from "react-router-dom";
import HomePage from '../routes/homePage';
import LocationSearchPage from '../routes/locationSearchPage';
import RecentlyViewedPage from '../routes/recentlyViewedPage';
import { createBrowserHistory } from "history";
import { TransitionGroup, CSSTransition } from "react-transition-group";

let spaces = require('../study-spaces.json');
const history = createBrowserHistory();

const Wrapper = styled.div`
    height : 100%;
    .fade-enter {
        opacity: 0.01;
    }

    .fade-enter.fade-enter-active {
        opacity: 1;
        transition: opacity 300ms ease-in;
    }

    .fade-exit {
        opacity: 1;
    }

    .fade-exit.fade-exit-active {
        opacity: 0.01;
        transition: opacity 300ms ease-in;
    }

    div.transition-group {
        position: relative;
    }

    section.route-section {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
    }
`;

function clearAllLocalData() {
    localStorage.setItem('userPresets', JSON.stringify({
        "data": []
    }))
}

function Container({ location }) {

    return (
        <Wrapper>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    timeout={{ enter: 300, exit: 300 }}
                    classNames={'fade'}
                >
                    <section className="route-section">
                        <Switch location={location}>
                            <Route path="/search-results" render={() => <SearchResults data={spaces.data[0]} />} />
                            <Route path="/favorites" render={() => <Favorites />} />
                            <Route path="/settings">
                                <Settings handleClick={clearAllLocalData} />
                            </Route>
                            <Route path="/view-space" component={ViewSpace} />
                            <Route path="/search">
                                <Search />
                            </Route>
                            <Route path="/location-search">
                                <LocationSearchPage data={spaces.data} />
                            </Route>
                            <Route path="/recently-viewed">
                                <RecentlyViewedPage data={spaces.data[0]} />
                            </Route>
                            <Route path="/" render={() => <HomePage history={history} />} />
                        </Switch>
                    </section>
                </CSSTransition>
            </TransitionGroup>
        </Wrapper>
    );
}

export default withRouter(Container);
