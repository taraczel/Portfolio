/* Dependencies */
// libraries
import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
// components
import Modal from '../modal/Modal';
import Contact from '../modal/contact/Contact';
import Moveto from '../utils/Moveto';
// action creator
import {
  modalHandlerCreator,
  selectedMenuCreator,
  changeDetectedCreator,
  isReadyToMoveCreator,
  isTransitionEndCreator,
} from '../../actions';
// modules
import { flex, mediaQuery } from '../../styles/presets';
import { A, Button } from '../../styles/elementsPreset';

/* Component Body */
const Main = () => {
  // state 'modalState'값
  const modalState = useSelector(state => state.modalState);
  const selectedMenu = useSelector(state => state.selectedMenu);
  const isChangeDetected = useSelector(state => state.isChangeDetected);
  // action 업데이트용
  const dispatch = useDispatch();
  // refs
  const target = useRef();
  const about = useRef();
  const works = useRef();
  const test = useRef();
  // location
  const location = useLocation();

  const content = '프론트엔드 개발자를 희망하는 이치행의 포트폴리오입니다. ';

  useEffect(() => {
    const fadeIn = setTimeout(() => {
      test.current.style.opacity = '100%';
    }, 300);
    return () => clearTimeout(fadeIn);
  }, [])

  useEffect(() => {
    let index = 0;
    const foo = document.querySelector('.intro');
    // if (target.current !== null) {
    if (foo) {
      const typing = () => {
        // target.current.textContent += content[index];
        foo.textContent += content[index];
        index += 1;
        if (index > content.length - 1) {
          return setTimeout(() => {
            index = 0;
            // target.current.textContent = '';
            foo.textContent = '　';
          }, 190);
        }
      };
  
      // if (target.current) {
        const timerId = setInterval(() => typing(), 200);
        return () => {
          clearInterval(timerId);
          clearTimeout(typing);
        };
      // }
    }
  }, [selectedMenu]);

  useEffect(() => {
    if (location.pathname === '/' && selectedMenu !== '') {
      dispatch(selectedMenuCreator(''));
    }
    dispatch(isTransitionEndCreator(false));
    dispatch(isReadyToMoveCreator(false));
    dispatch(changeDetectedCreator(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (selectedMenu === '' && location.pathname === '/') {
    return (
      <div
        className="Main"
        ref={test}
        css={css`
          ${flex.vertical};
          width: 100%;
          height: 100vh;
          position: relative;
          opacity: 0;
          transition: all 0.3s;

          *:not(.header-container *, .intro) {
            margin: 20px;
          }

          @keyframes blink-effect {
            50% {
              opacity: 0;
            }
          }
  
          .typing_cursor {
            margin: 0;
            border: 1px solid black;
            width: 2.5px;
            height: 18px;
            background-color: black;
            animation: blink-effect 1s step-end infinite;
            display: inline-block;
          }

          .header-container, hr, section, a, button.contact {
            opacity: ${isChangeDetected ? '0' : '100%'};
            transition: all 0.3s;
          }

          button.about, button.works {
            transition: all 0.3s;
          }
        `}
      >
        <div
          className="header-container"
          css={css`
            border-radius: 15px;
            ${flex.vertical};
            min-width: 150px;
            min-height: 100px;
            width: 25vw;
            height: 17vw;
            background-color: black;
            color: white;
          `}
        >
          <h1
            css={css`
              margin: 0;
              font-size: calc(14vw*0.45);
              line-height: 0.9;
              ${mediaQuery.setMobile} {
                font-size: 38px;
              }
            `}
          >LCH</h1>
          <h2
            css={css`
              margin: 0;
              font-size: calc(14vw*0.2);
              text-align: center;
              ${mediaQuery.setMobile} {
                font-size: 17px;
              }
            `}
          >
            FRONTEND
          </h2>
          <h2
            css={css`
              margin: 0;
              font-size: calc(14vw*0.2);
              text-align: center;
              ${mediaQuery.setMobile} {
                font-size: 17px;
              }
            `}
          >PORTFOLIO</h2>
        </div>
        <hr
          css={css`
            // 임시
            border-color: red;
            margin: 2% 0;
            width: 35%;
            @media (max-width: 900px) {
              width: 40%;
            }
            @media (max-width: 600px) {
              width: 45%;
            }
          `}
        />
        <section
          css={css`
            ${flex.horizontal.center}
          
            p {
              margin-right: 3px;
            }
          `}
          >
          <p
            className="intro"
            ref={target}
            css={css`
              @media (max-width: 600px) {
                font-size: 12px;
              }
            `}
          >　</p>
          <span className="typing_cursor"></span>
        </section>
        <div className="menu">
          <Button
          className="about"
            ref={about}
            onClick={() => {
                dispatch(changeDetectedCreator(true));
                works.current.style.opacity = 0;
                setTimeout(() => dispatch(selectedMenuCreator(about.current.textContent)), 301);
              }
            }
          >ABOUT</Button>
          <Button
            className="works"
            ref={works}
            onClick={() => {
                dispatch(changeDetectedCreator(true));
                about.current.style.opacity = 0;
                setTimeout(() => dispatch(selectedMenuCreator(works.current.textContent)), 301);
              }
            }
          >WORKS</Button>
          <A href="https://github.com/godcl1623" target="_blank" rel="noreferrer noopener">GITHUB</A>
          <A href="https://godcl1623.tistory.com/" target="_blank" rel="noreferrer noopener">BLOG</A>
          <Button
            className="contact"
            onClick={() => dispatch(modalHandlerCreator(true))}
          >CONTACT</Button>
        </div>
        {/*
          modalState: false면 모달창 닫힌 상태
          changeState: 모달창 배경이나 닫기 버튼을 클릭하면 modalState 값을 바꿈
          componentInDisplay: 모달창이 표시할 컴포넌트
         */}
        <Modal
          modalState={modalState}
          changeState={boolean => dispatch(modalHandlerCreator(boolean))}
          componentInDisplay={Contact}
        />
      </div>
    );
  }
  return (
    <Moveto
      offsetTop={selectedMenu === 'ABOUT' ? about.current.offsetTop : works.current.offsetTop}
      offsetLeft={selectedMenu === 'ABOUT' ? about.current.offsetLeft : works.current.offsetLeft}
    />
  );
};

export default Main;