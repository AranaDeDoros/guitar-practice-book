import React, { useEffect, useRef } from "react";
import { MeterGroup } from "primereact/metergroup";
import {ProgressEnum} from "../enums/ProgressEnum"
import PropTypes from 'prop-types';

export  function Progress(level) {
  const values =  Object.values(ProgressEnum).filter(p => p.value == level.level)

  return (
    <div className="card flex justify-content-center">
      <MeterGroup values={values} max="100" />
    </div>
  );
}
Progress.propTypes = {
   level: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.number,
      color: PropTypes.string,
      label: PropTypes.string,
    })).isRequired
 };