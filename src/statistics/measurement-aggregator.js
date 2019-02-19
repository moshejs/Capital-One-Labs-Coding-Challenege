import { HttpError } from '../errors';
import { Measurement } from '../measurements/measurement';

/**
 * Compute statistics for given measurements
 * @param {Measurement} measurements
 * @param {String[]} metrics
 * @param {String[]} stats
 * @return {*}
 */
export function computeStats(measurements, metrics, stats) {

    const statistics = [];

    if (!measurements.length) return statistics;


    metrics.forEach(metric => {
      stats.forEach(stat => {
        statistics.push({
            value: computeValue(measurements, metric, stat),
            stat: stat,
            metric: metric
        });
      });
    });

    return statistics.filter(stat => stat.value !== null);
}

function computeValue(measurements, metric, stat) {

  const metricValuesArray = measurements
        .map(measurement => measurement.getMetric(metric))
        .filter(measurement => !!measurement);

  if(!metricValuesArray.length) return null;
    switch (stat.toLowerCase()) {
        case 'average':
            return computeAverage(metricValuesArray);
        case 'min':
            return computeMin(metricValuesArray);
        case 'max':
            return computeMax(metricValuesArray);
        default:
            return null;
    }
}


function computeAverage(metricValuesArray) {
  const sum = metricValuesArray
      .reduce((total, curr) => total += curr, 0);

  return Number((sum / metricValuesArray.length).toFixed(1));

}

function computeMin(metricValuesArray) {
    return Math.min(...metricValuesArray);
}

function computeMax(metricValuesArray) {
    return Math.max(...metricValuesArray);
}