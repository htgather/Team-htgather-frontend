import React from "react";
import { ThemeProvider } from "styled-components";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import Main from "../pages/Main";
import Detail from "../pages/Detail";
import "./App.css";
import theme from "./Theme";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import jwt_decode from "jwt-decode";
// import { PlayInfoProvider } from '../context/PlayInfoContext';

function App() {
  const dispatch = useDispatch();
  const nickName = localStorage.getItem("isLogin")
    ? jwt_decode(localStorage.getItem("isLogin")).nickName
    : false;

  React.useEffect(() => {
    if (nickName) {
      dispatch(userActions.getNickname(nickName));
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Main}></Route>
          {/* <PlayInfoProvider> */}
          <Route path="/room/:roomId" exact component={Detail}></Route>
          {/* </PlayInfoProvider> */}
        </ConnectedRouter>
      </ThemeProvider>
    </>
  );
}

// 컴포넌트에서 theme 사용법
// const Title = styled.h1`
//   color: ${props => props.theme.color.primary};
// `;
export default App;
