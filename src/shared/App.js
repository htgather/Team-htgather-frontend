import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import Main from '../pages/Main';
import Header from '../components/Header';
import Detail from '../pages/Detail';
import PadDetail from '../pages/PadDetail'; //반응형 뷰 그리기용
import theme from './Theme';

function App() {
  const isLocal = localStorage.getItem('isLogin') ? true : false;

  return (
    <>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          {/* <Header /> */}
          <Route path="/" exact component={Main}></Route>
          <Route path="/room/:roomId" exact component={PadDetail}></Route>
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
