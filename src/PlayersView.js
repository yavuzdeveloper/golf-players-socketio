import React, { useEffect, useReducer } from "react";
import { Table, Input, Button, Form } from "semantic-ui-react";
import { reducer } from "./reducer";
import { socket } from "./socket";


const PlayersView = () => {
  const fetchPlayers = () => {
    let Players = [];
    socket.on("data-update", data => {
      Players.push(data);
      dispatch({
        type: "FETCH_PLAYERS",
        payload: Players,
      });
    });
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const [state, dispatch] = useReducer(reducer, {
    column: null,
    data: [],
    direction: null,
    inputFirstName: "",
    inputLastName: "",
  });

  const { column, data, direction, inputFirstName, inputLastName } = state;

  const handleFirstName = e => {
    dispatch({
      type: "INPUT_FIRST_NAME",
      payload: e.target.value,
    });
  };

  const onSubmitForm = e => {
    apply();
  };

  const handleLastName = e => {
    dispatch({
      type: "INPUT_LAST_NAME",
      payload: e.target.value,
    });
  };

  const apply = () => {
    if (inputFirstName) {
      dispatch({
        type: "FIRST_NAME_FILTER",
        payload: inputFirstName,
      });
    } else if (inputLastName) {
      dispatch({
        type: "LAST_NAME_FILTER",
        payload: inputLastName,
      });
    } else {
      fetchPlayers();
    }
  };

  return (
    <div>
      <Form className="ui form" onSubmit={() => onSubmitForm()}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="fields">
            <div className="field">
              <label>First Name:</label>
              <Input type="text" onChange={e => handleFirstName(e)} />
            </div>
            <div className="field">
              <label>Last Name:</label>
              <Input type="text" onChange={e => handleLastName(e)} />
            </div>
          </div>
          <div style={{ padding: "23px 0 0 10px" }}>
            <Button className="ui button" onClick={() => apply()}>
              Apply
            </Button>
          </div>
        </div>
      </Form>
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "First" ? direction : null}
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "First" })}
            >
              First Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "lastName" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "lastName" })
              }
            >
              Last Name
            </Table.HeaderCell>
            <Table.HeaderCell>Nationality</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "Match" ? direction : null}
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "Match" })}
            >
              Match
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === "InStrokes" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "InStrokes" })
              }
            >
              In Strokes
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "OutStrokes" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "OutStrokes" })
              }
            >
              Out Strokes
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "totalStrokes" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "totalStrokes" })
              }
            >
              Total Strokes
            </Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(
            ({
              First,
              Last,
              Nationality,
              Match,
              TotalStrokes,
              InStrokes,
              OutStrokes,
              Score,
              position,
            }) => (
              <Table.Row key={Last}>
                <Table.Cell>{First}</Table.Cell>
                <Table.Cell>{Last}</Table.Cell>
                <Table.Cell>{Nationality}</Table.Cell>
                <Table.Cell>{Match}</Table.Cell>
                <Table.Cell>{InStrokes}</Table.Cell>
                <Table.Cell>{OutStrokes}</Table.Cell>
                <Table.Cell>{TotalStrokes}</Table.Cell>
                <Table.Cell>{Score}</Table.Cell>
                <Table.Cell>{position}</Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default PlayersView;
