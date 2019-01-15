import {} from "../utils";
import { IncrementMiddleware, stringReducer } from "./testData";
import { Store } from "../store";

describe("Middleware", () => {
  test("are invoked by the store", () => {
    const middleware = new IncrementMiddleware();
    const store = new Store<string>(stringReducer, "hello", [middleware]);
    store.dispatch("test");
    expect(middleware.counter).toBe(1);
  });

  // test('are applied in the correct order', ()=>{
  //   const middleware1 = new IncrementMiddleware();
  //   const middleware2 = new IncrementMiddleware();
  //   const store = new Store<string>(
  //     stringReducer,
  //     initialState: 'hello',
  //     middleware: [middleware1, middleware2],
  //   );

  //   const order = <string>[];
  //   middleware1.invocations.subscribe((action) => order.add('first'));
  //   middleware2.invocations.subscribe((action) => order.add('second'));

  //   store.dispatch('test');
  //   expect(order[0], equals('first'));
  //   expect(order[1], equals('second'));
  // });

  // test('actions can be dispatched multiple times', ()=>{
  //   const middleware1 = new ExtraActionIncrementMiddleware();
  //   const middleware2 = new IncrementMiddleware();
  //   const store = new Store<string>(
  //     stringReducer,
  //     initialState: 'hello',
  //     middleware: [middleware1, middleware2],
  //   );

  //   const order = <string>[];
  //   middleware1.invocations.subscribe((action) => order.add('first'));
  //   middleware2.invocations.subscribe((action) => order.add('second'));

  //   store.dispatch('test');
  //   expect(order[0], equals('first'));
  //   expect(order[1], equals('second'));
  //   expect(order[2], equals('second'));
  // });

  // test('actions can be dispatched through entire chain', ()=>{
  //   const middleware1 = new ExtraActionIfDispatchedIncrementMiddleware();
  //   const middleware2 = new IncrementMiddleware();
  //   const store = new Store<string>(
  //     stringReducer,
  //     initialState: 'hello',
  //     middleware: [middleware1, middleware2],
  //   );

  //   const order = <string>[];
  //   middleware1.invocations.subscribe((action) => order.add('first'));
  //   middleware2.invocations.subscribe((action) => order.add('second'));

  //   store.dispatch('test');

  //   expect(order[0], equals('first'));
  //   expect(order[1], equals('second'));
  //   expect(order[2], equals('first'));
  //   expect(order[3], equals('second'));

  //   expect(middleware1.counter, equals(2));
  // });

  // test('actions can be dispatched through entire chain', ()=>{
  //   const middleware1 = new ExtraActionIfDispatchedIncrementMiddleware();
  //   const middleware2 = new IncrementMiddleware();
  //   const store = new Store<string>(
  //     stringReducer,
  //     initialState: 'hello',
  //     middleware: [middleware1, middleware2],
  //   );

  //   const order = <string>[];
  //   middleware1.invocations.subscribe((action) => order.add('first'));
  //   middleware2.invocations.subscribe((action) => order.add('second'));

  //   store.dispatch('test');

  //   expect(order[0], equals('first'));
  //   expect(order[1], equals('second'));
  //   expect(order[2], equals('first'));
  //   expect(order[3], equals('second'));

  //   expect(middleware1.counter, equals(2));
  // });
});
