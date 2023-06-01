const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = event?.partitionKey || generateHash(event) || TRIVIAL_PARTITION_KEY;
  candidate = stringifyData(candidate);
  return candidate.length > MAX_PARTITION_KEY_LENGTH ? generateHash(candidate) : candidate;
};

const generateHash = (event) => {
  if(event) {
    const data = stringifyData(event);
    return crypto.createHash("sha3-512").update(data).digest("hex");
  }
  return null;
}

const stringifyData = (data) => {
  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }
  return data;
}
