import "./App.css";
import PlayersView from "./PlayersView";
import { Container, Header } from "semantic-ui-react";

function App() {
  return (
    <Container>
      <Header as="h2" style={{ marginTop: "20px" }}>
        Golf-players
      </Header>
      <PlayersView />
    </Container>
  );
}

export default App;
