module.exports.getHeightInMeters = function(heightInCemtimeters) {
  const heightInMeters = heightInCemtimeters / 100;
  const heightInMetersWithTwoDecimals = heightInMeters.toFixed(2);
  const textualResult = `${heightInMetersWithTwoDecimals} meter`;
  return textualResult;
}