import { Measurement } from './measurement';
import { HttpError } from '../errors';



const store = [];


/**
 * Add new measurement
 * @param {Measurement} measurement to be added
 */
export function add(measurement) {
  store.push(measurement);
}
/**
 * Get existing measurement
 * @param {Date} timestamp when measurement was taken
 * @returns {Measurement} measurement for the particular date
 */
export function fetch(timestamp) {
  const pluckMeasurement = store.filter(measurement => {
    return measurement.timestamp.toString() === timestamp.toString();
  });

  if(pluckMeasurement.length) {
    return pluckMeasurement[0];
  }
  throw new HttpError(404);
}

/**
 * Get the measurements within the given date range
 * @param {Date} start Lower bound for the query, inclusive
 * @param {Date} end Upper bound for the query, exclusive
 */
export function queryDateRange(from, to) {
    return store.filter(measurement =>
        measurement.timestamp.valueOf() >= from.valueOf()
        && measurement.timestamp.valueOf() < to.valueOf()
    );
}
