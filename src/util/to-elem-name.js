const toElemName = (placementType) => placementType.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');

export default toElemName;
