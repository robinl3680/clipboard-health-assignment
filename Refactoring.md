# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

1. First of all I have used js optional chaining operator to avoid multiple 'if' check on the candidate to check if the partition key is available
2. Seggregated the logic of generating hash which makes the functionality independent and testable. Also it helped in re-using the logic as we were hashing at two different places. I followed single responsibility pattern here.
3. Again as per single responsbility, created new function 'stringifyData' which seperates stringfying logic from main function.
4. By combining  event?.partitionKey || generateHash(event) || TRIVIAL_PARTITION_KEY have optimised the logical operation chaining, as per js as soon as it finds any of this as true remaining expression evaluation will be skipped.
5. Used conditional terenery operator to check if candidate length is greater than MAX_PARTITION_KEY_LENGTH which improved the readability.
