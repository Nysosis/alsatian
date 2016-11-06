import { Expect, TestCase, FocusTests, SpyOn } from "../../../core/alsatian-core";
import { FunctionSpyMatcher } from "../../../core/matchers";
import { FunctionCallCountMatchError } from "../../../core/_errors";
import { FunctionSpy } from "../../../core/_spying";

@FocusTests
export class FunctionSpyMatcherTests {

   @TestCase(null)
   @TestCase(undefined)
   public nullOrUndefinedSpyThrowsError(spy: FunctionSpy) {
      Expect(() => new FunctionSpyMatcher(spy)).toThrowError(TypeError, "spy must not be null or undefined.");
   }

   @TestCase(0)
   @TestCase(-1)
   @TestCase(-2)
   @TestCase(-42)
   public negativeOrZeroExactlyValueThrowsError(expectedCallCount: number) {
      const some = {
         function: () => {}
      };

      SpyOn(some, "function");

      const spyMatcher = new FunctionSpyMatcher(<any>some.function);

      Expect(() => spyMatcher.exactly(expectedCallCount).times).toThrowError(TypeError, "expectedCallCount must be greater than 0.");
   }

   @TestCase(1)
   @TestCase(2)
   @TestCase(42)
   public exactlyMatchesDoesNotThrow(callCount: number) {
      const some = {
         function: () => {}
      };

      SpyOn(some, "function");

      for (let i = 0; i < callCount; i++) {
         some.function();
      }

      const spyMatcher = new FunctionSpyMatcher(<any>some.function);

      Expect(() => spyMatcher.exactly(callCount).times).not.toThrow();
   }

   @TestCase(1, 42)
   @TestCase(2, 1)
   @TestCase(42, 2)
   public exactlyDoesntMatchThrowsError(expectedCallCount: number, actualCallCount: number) {
      const some = {
         function: () => {}
      };

      SpyOn(some, "function");

      for (let i = 0; i < actualCallCount; i++) {
         some.function();
      }

      const spyMatcher = new FunctionSpyMatcher(<any>some.function);

      if (expectedCallCount === 1) {
         Expect(() => spyMatcher.exactly(expectedCallCount).times).toThrowError(FunctionCallCountMatchError, `Expected function to be called 1 time.`);         
      }
      else {
         Expect(() => spyMatcher.exactly(expectedCallCount).times).toThrowError(FunctionCallCountMatchError, `Expected function to be called ${expectedCallCount} times.`);
      }
   }

   //Less than matches
   //Not Less than matches

   //Less than does not match
   //Not Less than does not match

   //More than matches
   //Not more than matches

   //More than does not match
   //Not more than does not match

   //exactly matches
   //not exactly matches

   //exactly does not match
   //not exactly does not match
}
