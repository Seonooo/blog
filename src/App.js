import React, { useState } from 'react';
import './App.css';

const App = () => {

  let [titles, setTitles] = useState(['남자 코트 추천', '강남 맛집추천', '신발 추천']);
  let [titleNumber, setTitleNumber] = useState(0);
  let [like, setLike] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [addTitle, setAddTitle] = useState('');

  return (
    <div className="App">
      <div className='black-nav'>
        <h4 >ReactBlog</h4>
      </div>

      <button onClick={()=>{
        const sortTitle = [...titles.sort()];
        setTitles(sortTitle);
      }}>가나다순정렬</button>

{/* 
  state함수 특징 : 기존 state == 신규state => 변경x(자원절약)
  array/object 특징 : array, object를 담은 변수엔 화살표만 저장
  state함수가 array, object라면 shallow copy를 통해 수정
  state 변경함수는 비동기함수
  reference data 참조
 */}
      <button onClick={()=> {
        const copy = [...titles]; // ... : 괄호 벗기기 즉 title, 화살표도 달라짐 => 별개의 복사본이 됨
        copy[0] = '여자코트 추천'
        setTitles(copy);
      }}>제목변경</button>

      {
        titles.map((title, i)=>{
          return(
            <div className='list' key={i}>
              <h4 onClick={()=>{setModal(!modal); setTitleNumber(i);}}>{title}<span onClick={()=>{
                const likes = [...like];
                likes[i] = likes[i]+1;
                setLike(likes);
              }}>💖</span> {like[i]}</h4>
              <p>2월17일 발행</p>
              <button onClick={()=>{
                let copy = [...titles];
                copy.splice(i,1);
                setTitles(copy);
              }}>삭제</button>
            </div>
          )
        })
      }
        <input type="text" onChange={(e)=>{
          setAddTitle(e.target.value);
        }}/>
        <button onClick={()=>{
          const copy = [...titles];
          copy.unshift(addTitle);
          setTitles(copy);
        }}>등록하기</button>
      
      {
        modal === true ? <Modal title={titles} titleNumber={titleNumber} setTitle={setTitles}/> : null
      }

    </div>
  );
}

const Modal = (props) => {
  return(
    <div className='modal'>
      <h4>{props.title[props.titleNumber]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={()=>{
        const copy = [...props.title];
        copy[0] = '여자코트 추천'
        props.setTitle(copy);
      }}>글수정</button>
    </div>
  )
}

export default App;

//class 컴포넌트 사용법
// class Modal2 extends React.Componen{
//   constructor(){
//     super();
//      this.state = {
//        name: 'asd',
//        age: 120,
//      }
//   }
//   render(){
//     return(
//       <div>
//         {this.state.name}
//       </div>
//     )
//   }
// }