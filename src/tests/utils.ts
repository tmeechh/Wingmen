
/**
 * Custom type to mock functions in Jest.
 * This type ensures that the mock function behaves correctly with the expected parameters and return type.
 *
 * @template T - The function type to mock (should be a function that accepts arguments and returns a value).
 * 
 * The `JestMock` type:
 * - Extends Jest's `Mock` type to ensure the correct types for return value and parameters.
 * - Uses `ReturnType<T>` to get the return type of the original function.
 * - Uses `Parameters<T>` to get the parameter types of the original function.
 *
 * By using `unknown[]` instead of `any[]`, this type is safer, as `unknown` requires explicit type checking
 * before usage, reducing the risk of runtime errors.
 */


export type JestMock<T extends (...args: unknown[]) => unknown> = jest.Mock<ReturnType<T>, Parameters<T>>;
