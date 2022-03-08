import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import styled from 'styled-components';
import Main from '../pages/Main';
import Header from '../components/Header';
import { ThemeProvider } from 'styled-components';
import theme from './Theme';
import RoomClickModal from '../components/RoomClickModal';
import MyPart from '../components/MyPart';
import KakaoLogin from '../components/KakaoLogin';

function App() {
  return (
    <>
      <Background>
        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <Header></Header>
            <Route path="/" exact component={Main}></Route>
            <Route path="/kakaoLogin" component={KakaoLogin}></Route>
          </ConnectedRouter>
        </ThemeProvider>
      </Background>
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
