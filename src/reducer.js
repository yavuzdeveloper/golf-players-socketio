import _ from "lodash";

export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PLAYERS":
      return { ...state, data: action.payload };

    case "FIRST_NAME_FILTER":
      return {
        ...state,
        data: state.data.filter(player =>
          player.First.includes(action.payload)
        ),
      };

    case "LAST_NAME_FILTER":
      return {
        ...state,
        data: state.data.filter(player => player.Last.includes(action.payload)),
      };

    case "INPUT_FIRST_NAME":
      return { ...state, inputFirstName: action.payload };

    case "INPUT_LAST_NAME":
      return { ...state, inputLastName: action.payload };

    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: "ascending",
      };
    default:
      throw new Error();
  }
};
