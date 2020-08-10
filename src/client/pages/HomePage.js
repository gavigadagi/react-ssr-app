/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types'; // ES6
import { fetchSpaceXLaunches } from '../actions';

import Card from '../components/Card';

const HomePage = (props) => {
  const [years, setYears] = useState([
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
  ]);
  const [selectedYear, setSelectedYear] = useState('');
  const [successfulLaunch, setSuccessfulLaunch] = useState('');
  const [successfulLanding, setSuccessfulLanding] = useState('');
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
  const { launches } = props;

  useEffect(() => {
    props.fetchSpaceXLaunches(selectedYear, successfulLaunch, successfulLanding);
  }, [selectedYear, successfulLaunch, successfulLanding]);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadLaunches();
  }, [loadLaunches]);
  return (
    <div>
      {head()}
      <div className="wrapper">
        <div className="side-section">
          <div className="filters">
            <h3>Filters</h3>
            <div className="filter-section">
              <section className="filter-item">
                <div className="filter-title">
                  <p className="filter-title-text">Section Title</p>
                </div>
                <div className="list year-list">
                  {years.map((year) => (
                    <button
                      type="button"
                      className={`list-item ${selectedYear === year ? ' active' : ''}`}
                      key={year}
                      onClick={() => setSelectedYear(year)}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </section>
              <section className="filter-item">
                <div className="filter-title">
                  <p className="filter-title-text">Successful Lounch</p>
                </div>
                <div className="list success_launch">
                  <button
                    type="button"
                    className={`list-item ${successfulLaunch === true ? ' active' : ''}`}
                    onClick={() => setSuccessfulLaunch(true)}
                  >
                    True
                  </button>
                  <button
                    type="button"
                    className={`list-item ${successfulLaunch === false ? ' active' : ''}`}
                    onClick={() => setSuccessfulLaunch(false)}
                  >
                    False
                  </button>
                </div>
              </section>
              <section className="filter-item">
                <div className="filter-title">
                  <p className="filter-title-text">Successful Landing</p>
                </div>
                <div className="list success_landing">
                  <button
                    type="button"
                    className={`list-item ${successfulLanding === true ? ' active' : ''}`}
                    onClick={() => setSuccessfulLanding(true)}
                  >
                    True
                  </button>
                  <button
                    type="button"
                    className={`list-item ${successfulLanding === false ? ' active' : ''}`}
                    onClick={() => setSuccessfulLanding(false)}
                  >
                    False
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
        <div className="main-content">
          {launches.length ? (
            launches.map((launch) => <Card key={launch.flight_number} data={launch} />)
          ) : (
            <div className="loader">
              <span>Loading...</span>
            </div>
          )}
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
