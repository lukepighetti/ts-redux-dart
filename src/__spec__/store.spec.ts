import { Store } from "../store";
import { stringReducer } from "./testData";

describe("store", () => {
  test("calls the reducer when an action is fired", () => {
    const store = new Store<string>(stringReducer, "Hello");
    const action = "test";
    store.dispatch(action);
    expect(store.state).toBe(action);
  });

  test("cancelled subscriber should not be notified", () => {
    var subscriber1Called = false;
    var subscriber2Called = false;

    const store = new Store<string>(stringReducer, "hello");

    const subscription = store.onChange.subscribe((state: string) => {
      subscriber2Called = true;
    });

    store.onChange.subscribe((state: string) => {
      subscriber1Called = true;
    });

    subscription.unsubscribe();
    store.dispatch("action");
    expect(subscriber1Called).toBe(true);
    expect(subscriber2Called).toBe(false);
  });

  test("store emits current state to subscribers", () => {
    const action = "test";
    const states: string[] = [];
    const store = new Store<string>(stringReducer, "hello");

    store.onChange.subscribe(state => states.push(state));

    // Dispatch two actions. Both should be emitted by default.
    store.dispatch(action);
    store.dispatch(action);

    expect(states).toEqual([action, action]);
  });

  test("store does not emit an onChange if distinct", () => {
    const action = "test";
    const states: string[] = [];
    const store = new Store<string>(stringReducer, "hello", [], true);
    store.onChange.subscribe(state => states.push(state));

    // Dispatch two actions. Only one should be emitted b/c distinct is true
    store.dispatch(action);
    store.dispatch(action);

    expect(states).toEqual([action]);
  });
});
