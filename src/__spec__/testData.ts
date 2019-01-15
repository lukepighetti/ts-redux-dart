import { Store, MiddlewareClass, NextDispatcher } from "../store";
import { Observable, Subject } from "rxjs";

// export const reducer1 = (state: string, action: any) => {
//   if (action == "helloReducer1") {
//     return "reducer 1 reporting";
//   }
//   return state;
// };

const notFound: string = "not found";

export const stringReducer = (state: string, action: any) =>
  typeof action == "string" ? action : notFound;

export class IncrementMiddleware implements MiddlewareClass<string> {
  public counter: number = 0;
  private _invocationsController = new Subject<string>();

  get invocations(): Observable<string> {
    return this._invocationsController.asObservable();
  }

  public call = (
    store: Store<string>,
    action: any,
    next: NextDispatcher
  ): void => {
    this.add(action);
    this.counter += 1;
    next(action);
  };

  public add(action: any): void {
    if (typeof action == "string") {
      this._invocationsController.next(action);
    }
  }
}

export class ExtraActionIncrementMiddleware extends IncrementMiddleware {
  public call = (
    store: Store<string>,
    action: any,
    next: NextDispatcher
  ): void => {
    this.add(action);
    this.counter += 1;
    next(action);
    next("another action");
  };
}

export class ExtraActionIfDispatchedIncrementMiddleware extends IncrementMiddleware {
  hasDispatched: boolean = false;

  public call = (
    store: Store<string>,
    action: any,
    next: NextDispatcher
  ): void => {
    this.add(action);
    this.counter += 1;
    next(action);
    if (!this.hasDispatched) {
      this.hasDispatched = true;
      store.dispatch("another action");
    }
  };
}
