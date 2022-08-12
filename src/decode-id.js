// Decode an ID to get an integer-based REST Admin API ID
const decodeId = (s) => {
  if (!s) {
    return null;
  }
  // ID is an integer already
  if (typeof s === 'number' || /^\d+$/.test(s)) {
    return s;
  }
  // ID is in the gid format
  if (s.startsWith('gid://')) {
    const parts = s.split('/');
    return parts[parts.length - 1];
  }
  // ID is base64 encoded
  return decodeId(atob(s));
};

export default decodeId;
