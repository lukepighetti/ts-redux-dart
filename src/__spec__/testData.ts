import {} from "../store";

// export const reducer1 = (state: string, action: any) => {
//   if (action == "helloReducer1") {
//     return "reducer 1 reporting";
//   }
//   return state;
// };

const notFound: string = "not found";

export const stringReducer = (state: string, action: any) =>
  typeof action == "string" ? action : notFound;
