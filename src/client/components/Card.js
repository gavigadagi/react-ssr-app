import React from 'react';
import PropTypes from 'prop-types'; // ES6

const Card = (props) => (
  <div className="card">
    <div className="card-image">
      <img src={props.data.links.mission_patch_small} alt={props.data.mission_name} />
    </div>
    <div className="card-content">
      <p className="card-title">{` ${props.data.mission_name} #${props.data.flight_number}`}</p>
      <div className="prop-key">Mission Ids: {props.data.mission_id.map((id) => id)}</div>
      <div className="prop-key">Launch Year: {props.data.launch_year}</div>
      <div className="prop-key">Successful Launch: {props.data.launch_success ? 'Yes' : 'No'}</div>
      <div className="prop-key">Successful Landing: {props.data.land_success ? 'Yes' : 'No'}</div>
    </div>
  </div>
);

// Card.propTypes = {
//     mission_id: PropTypes.arrayOf(PropTypes.string),
//     mission_name: PropTypes.string,
//     launch_year: PropTypes.string,
//     launch_success: PropTypes.string,
//     land_success: PropTypes.string,
//     flight_number: PropTypes.number
// };

export default Card;
