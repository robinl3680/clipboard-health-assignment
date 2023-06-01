const { deterministicPartitionKey } = require("./refactored");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Should return partition key if present", () => {
    const event = { partitionKey: 'abc' };
    const result = deterministicPartitionKey(event);
    expect(result).toBe('abc');
  });
  it("Should generate hash from event data if no partition key is availble", () => {
    const event = { id: 1, name: 'Robin' };
    const data = JSON.stringify(event);
    const hash = crypto.createHash('sha3-512').update(data).digest('hex');
    const result = deterministicPartitionKey(event);
    expect(result).toBe(hash);
  });
  test("should rehash candidate when length exceeds MAX_PARTITION_KEY_LENGTH", () => {
    const longString = "ab".repeat(200);
    const hash = crypto.createHash("sha3-512").update(longString).digest("hex");
    const result = deterministicPartitionKey(longString);
    expect(result).toBe(hash);
  });
});
