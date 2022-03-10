
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import Main from "../pages/Main";
import Header from "../components/Header";
import { ThemeProvider } from "styled-components";
import theme from "./Theme";
import Detail from "../pages/Detail";


function App() {
  const isLocal = localStorage.getItem('isLogin') ? true : false;

  return (
    <>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <Header></Header>
          <Route path="/" exact component={Main}></Route>
          <Route path="/room/:roomId" exact component={Detail}></Route>
        </ConnectedRouter>
      </ThemeProvider>
    </>
  );
}

const Background = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background-color: #e5e5e5;
`;
// 컴포넌트에서 theme 사용법
// const Title = styled.h1`
//   color: ${props => props.theme.color.primary};
// `;
export default App;
