/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types'; // ES6
import { fetchSpaceXLaunches } from '../actions';

const HomePage = (props) => {
  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>SSR React App</title>
        <meta property="og:title" content="SSR React App" />
        <meta name="description" content="list and filter spacex launches" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="/" />
      </Helmet>
    );
  };

  const renderArticles = () => {
    return props.launches.map((launch, i) => (
      <div className="col s12 m6 l6 xl4" key={launch.id}>
        <div className="card large">
          <div className="card-image">
            <LazyLoadImage alt={launch.title} src={launch.urlToImage} />
          </div>
          <div className="card-content">
            <span className="card-title">Mission Ids</span>
          </div>
          <div className="card-action">Read More</div>
        </div>
      </div>
    ));
  };

  const { fetchSpaceXLaunches: loadLaunches } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
    loadLaunches();
  }, [loadLaunches]);
  return (
    <div>
      {head()}
      <div className="row">
        <div className="section">
          <h3>SpaceX Launches</h3>
        </div>
        <div className="divider" />
        <div className="section">
          <div className="row">Lauches will be displayed here</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    launches: state.launches,
  };
};

const loadData = (store) => {
  // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
  // So we need to use store itself to load data
  return store.dispatch(fetchSpaceXLaunches(null, null, null)); // Manually dispatch a network request
};

HomePage.propTypes = {
  launches: PropTypes.arrayOf(PropTypes.any),
  fetchSpaceXLaunches: PropTypes.func,
};

HomePage.defaultProps = {
  launches: [],
  fetchSpaceXLaunches: null,
};

export default {
  component: connect(mapStateToProps, { fetchSpaceXLaunches })(HomePage),
  loadData,
};
