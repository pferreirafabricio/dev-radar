module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString = arrayAsString.split(",").map(tech => tech.trim());
}