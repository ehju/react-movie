# 노마드 - 리엑트 JS로 영화 웹서비스 만들기

영화 웹서비스!

## why react

- react는 facebook에서 만든 frontend frame work 이며 많은 기업들에서 react를 이용해 web 어플리케이션을 만든다.
- 페이스북이 프로젝트를 관리하며 커뮤니티가 크다는 점 이 장점이다.
- 대부분 javascript 문법이므로 활용성이 좋다.

## create react app

- react는 최신 Javascript 를 사용하기 때문에 webpack, babel등을 다운로드하고 컴파일하는 과정이 필요하다.
- create-react-app 를 쓰면 command 하나로 react 개발 환경을 빠르게 setup 할 수 있다.
- 완료되면 폴더 구조와 소스코드들이 생성된다.

```bash
npx create-react-app
create-react-app app
npm start
```

- npm start 를 입력하면 local host 또는 지역 ip를 통해 현재상태의 앱을 개발중에 확인 할 수 있다.

## How React Works

- 만들어진 React 프로젝트의 public/index.html을 확인해보면 body 가 비어있는 것을 확인할 수 있다.

```html
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
</body>
```

- 그렇다면 화면에 표시되는 많은 정보들은 어디에 있는 것일까?
- React는 element들을 javascript로 만들어서 빈 html 파일 안에 밀어넣는다.

 

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App/>,document.getElementById("root"));
```

- 즉, React는 빈 HTML의 Virtual DOM에 필요에 따라 HTML을 추가/제거하는 방식이다.
- 실제로 `npm start`를 통해 화면을 띄워 봤을때 브라우저 화면에는 react가 랜더링한 컴포넌트들이 보이지만 소스코드를 확인했을때는 비어있다. → Virtual DOM

- `<App/>` 은 Component 이다.  Component는 HTML을 반환하는 함수다.

```jsx
import React from 'react';

function App(){
	return(
		<div className="App">
			<h1>Hello!</h1>
		</div>
	);
}

export default App;
```

- `<App/>` 이라고 써있는 이것은 html 문법처럼 보이는데 Component를 표기한 것이다. 이 방식은 JSX라 하며 JavaScript를 확장한 React만의 문법이다. 기본적으로 js의 모든 문법을 지원한다. ( javascript + html 이라고 생각하자)

## Reusable Comonents with JSX

- JSX에서는 Component 에 정보를 보내면 Component는 그정보를 이용해 HTML 을 만들어 낼 수 있다.  즉, 재사용이 가능한 Component를 만들어 낸다
- props : react 에서 component에 정보를 넘겨주려고 할때 component는 props 를 통해 정보를 넘겨받을 수 있다.

```jsx
<Greeting name="june" address="seoul"/>
```

- Component 이름 뒤에 들어가는 모든 정보들을 props 라고 한다.

```jsx
function Greeting(props){
  return <p>Hi {props.name}</p>
}

function Greeting({name}){
  return <p>Hi {name}</p>
}
```

JSX Expression must have one parent element. ts 

→ 여러줄의 HTML code를 리턴할때는 div로 감싸서.

## Dynamic Component Generation

- 서버,api,db 등으로부터 정보를 받아와서 그것들을 component로 동적으로 만들고싶다.
- Render all componets dynamically
- 우선 우리가 DB나 API로부터 이미 받아온 정보가 있다고 가정하자

```jsx
const teams = [
  {
    name:"Giants",
    keyPlayer:"JinWook"
  },
  {
    name:"Wiz",
    keyPlayer:"BaekHo"
  },
  {
    name:"Heroes",
    keyPlayer:"JeongHu"
  }
]
```

두가지 Rendering 방법의 비교

```jsx
function renderTeamInfo(team){
  return <Greeting name={team.name} keyplayer={team.keyPlayer}/>
}
function App() {

  return (
    <div className="App">
      <h1>Hello!</h1>
      {teams.map(renderTeamInfo)}
    </div>
  );
}
```

```jsx
function Greeting({name,keyplayer}){
  return <h4>{name}'s key player : {keyplayer}</h4>
}
function App() {

  return (
    <div className="App">
      <h1>Hello!</h1>
      {teams.map(team => <Greeting name={team.name} keyplayer={team.keyPlayer}/>)}
    </div>
  );
}
```

위 두가지 방식은 동일하게 동작한다.

이대로 실행하면 리스트의 각 항목에 key를 넣어야 한다는 경고가 표시된다고 한다.(~~나는 왜 안뜨지? 어 떴다.ㅎㅎ~~) 

```jsx
index.js:1 Warning: Each child in a list should have a unique "key" prop.

Check the render method of `App`. See https://reactjs.org/link/warning-keys for more information.
    at Greeting (http://localhost:3000/static/js/main.chunk.js:24:3)
    at App
```

“key”는 엘리먼트 리스트를 만들 때 포함해야 하는 특수한 문자열 어트리뷰트라고 한다. Object들을 list 안에 넣으면 유일성이 사라진다고 한다. (왜여) 

⇒ key 에 대한 추가로 볼 내용 :[https://awesomezero.com/development/react-key/](https://awesomezero.com/development/react-key/)

그래서 각 element들에 id 속성을 넣어주고 그것을 props.key 로 전달해주었다.

```jsx
{teams.map(team => <Greeting key={team.id} name={team.name} keyplayer={team.keyPlayer}/>)}
```

key를 사용하지 않더라도 prop으로 전달해주어야한다.

*img element must have an alt prop

```jsx
<img src={picture} alt={name}/>
```

→ 시작장애인을 위한 정보 . create-react-app을 쓰면 code style 에 대한 정보도 제공하기 때문에 편리하다.

## Protection with PropTypes

- 잘못된 props 를 전달했을때의 상황 → 이걸 방지하는 방법

```bash
npm i prop-types
```

- prop-types를 설치한다.

```jsx
import PropTypes from "prop-types";

Greeting.propTypes= {
  name : PropTypes.string.isRequired,
  keyplayer: PropTypes.string.isRequired
}
```

Component의 propType을 지정하고 이에 맞지 않을 시 console에 error가 나온다. 

Type과 requiredness 등을 확인할 수 있다.

document : [https://ko.reactjs.org/docs/typechecking-with-proptypes.html](https://ko.reactjs.org/docs/typechecking-with-proptypes.html)

## STATE

 react 상태관리 : [https://velog.io/@kyusung/리액트-교과서-React-컴포넌트와-상태-객체](https://velog.io/@kyusung/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B5%90%EA%B3%BC%EC%84%9C-React-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%99%80-%EC%83%81%ED%83%9C-%EA%B0%9D%EC%B2%B4)

State : 동적 데이터와 함께 작업할때 만들어짐 - 변화하는데이터

static하게 고정된 데이터말고 바뀌는 것

function component → class component

```jsx
class App extends React.Component{
	state = {
		count : 0;
	}
  render(){ 
    return <h1>I am a class  number is {this.state.cout}</h1>
  }
}
```

Class component는 state를 가지고 있다.

state는 변화하는 데이터를 넣을 수 있는 Object 이다.

그런데 저 state Object를 javascript 함수를 통해 직접 변경하려고 하면 warning이 발생한다

`Line 19:5:  Do not mutate state directly. Use setState()  react/no-direct-mutation-state`

state를 직접 바꾸지 말고 setState()를 사용하라고 한다. 직접변경이 불가능하다는 것이다.

```jsx
class App extends React.Component{
  state ={
    count:0
  };
  add = () => {
    console.log("add");
    this.setState({count : 1 })
  };
  minus = () => {
    console.log("minus");
    this.setState({count : -1 })
  };
  render(){ 
    return (
     <div>
       <h1>my number is : {this.state.count}</h1>
       <button onClick={this.add}>Add</button>
       <button onClick={this.minus}>Minus</button>
      </div>
    )
  };
}
```

react 에서는 state가 변경되면 render function 이 다시 호출된다. 

## Movie API 사용

`npm i axios`

yts api

[https://yts.mx/api](https://yts.mx/api)

⇒ torrant api라서 url 계속 바뀜. 

[https://github.com/serranoarevalo/yts-proxy](https://github.com/serranoarevalo/yts-proxy)

nomad coder 가 만든 yts-proxy

```html
<React.StrictMode>
</React.StrictMode>
```
