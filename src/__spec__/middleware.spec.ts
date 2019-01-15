import {} from "../utils";
import {
  IncrementMiddleware,
  stringReducer,
  ExtraActionIncrementMiddleware,
  ExtraActionIfDispatchedIncrementMiddleware
} from "./testData";
import { Store } from "../store";

describe("Middleware", () => {
  test("are invoked by the store", () => {
    const middleware = new IncrementMiddleware();
    const store = new Store<string>(stringReducer, "hello", [middleware]);
    store.dispatch("test");
    expect(middleware.counter).toBe(1);
  });

  test("are applied in the correct order", () => {
    const middleware1 = new IncrementMiddleware();
    const middleware2 = new IncrementMiddleware();
    const store = new Store<string>(stringReducer, "hello", [
      middleware1,
      middleware2
    ]);

    const order: string[] = [];
    middleware1.invocations.subscribe(action => order.push("first"));
    middleware2.invocations.subscribe(action => order.push("second"));

    store.dispatch("test");
    expect(order[0]).toBe("first");
    expect(order[1]).toBe("second");
  });

  test("actions can be dispatched multiple times", () => {
    const middleware1 = new ExtraActionIncrementMiddleware();
    const middleware2 = new IncrementMiddleware();
    const store = new Store<string>(stringReducer, "hello", [
      middleware1,
      middleware2
    ]);

    const order: string[] = [];
    middleware1.invocations.subscribe(action => order.push("first"));
    middleware2.invocations.subscribe(action => order.push("second"));

    store.dispatch("test");
    expect(order[0]).toBe("first");
    expect(order[1]).toBe("second");
    expect(order[2]).toBe("second");
  });

  test("actions can be dispatched through entire chain", () => {
    const middleware1 = new ExtraActionIfDispatchedIncrementMiddleware();
    const middleware2 = new IncrementMiddleware();
    const store = new Store<string>(stringReducer, "hello", [
      middleware1,
      middleware2
    ]);

    const order: string[] = [];
    middleware1.invocations.subscribe(action => order.push("first"));
    middleware2.invocations.subscribe(action => order.push("second"));

    store.dispatch("test");

    expect(order[0]).toBe("first");
    expect(order[1]).toBe("second");
    expect(order[2]).toBe("first");
    expect(order[3]).toBe("second");

    expect(middleware1.counter).toBe(2);
  });
});
