/* Dependencies */
// libraries
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { selectedMenuCreator, changeDetectedCreator } from '../../actions';
// components
import Common from '../utils/Common';
import GenContent from '../utils/GenContent';
import GenSection from '../utils/GenSection';
// modules
import { selfInfo, introduction, skills } from '../../db/aboutData';
import { flex, sizes } from '../../styles/presets';
import { Button } from '../../styles/elementsPreset';
import tools from '../../modules/customfunctions';

  // Handler
  const navToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  };

  const scrollHandler = () => {
    const topBtn = document.querySelector('.to-top');
    if (window.scrollY < window.innerHeight) {
      topBtn.style.opacity = '0';
    } else {
      topBtn.style.opacity = '100%';
    }
  }

  const childContent = (
    <React.Fragment>
      <GenContent object={selfInfo} />
      <GenSection data={introduction} fold={true} />
      <GenSection data={skills} fold={false} />
    </React.Fragment>
  );

/* Component Body */
const About = () => {
  // Init Hooks
  const changeStatus = useSelector(state => state.isChangeDetected);
  const dispatch = useDispatch();

  // For Animations
  useEffect(() => {
    const foo = document.querySelectorAll('.area-header');
    console.log(foo);
    dispatch(selectedMenuCreator(''));
    const disableOpacity = setTimeout(() => dispatch(changeDetectedCreator(false)), 100);
    window.addEventListener('scroll', tools.debouncer(scrollHandler));
    return () => {
      clearTimeout(disableOpacity);
      window.removeEventListener('scroll', tools.debouncer(scrollHandler));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="About"
      css={css`
        margin: 30px auto;
        border: none;
        border-radius: 10px;
        box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.3);
        ${flex.vertical}
        ${sizes.full}
        width: 80%;
        background-color: white;
        opacity: ${changeStatus ? '0' : '100%'};
        transition: all 0.3s;

        * {
          opacity: ${changeStatus ? '0' : '100%'};
          transition: all 0.3s;
        }
      `}
    >
      <Common heading='ABOUT' passed={childContent} />
      <Button
        className="to-top"
        onClick={() => navToTop()}
        css={css`
          border-radius: 50%;
          padding: 0;
          width: 30px;
          height: 30px;
          position: fixed;
          top: 92vh;
          right: 2.5vw;
          opacity: 0;
        `}
      >
        <MdKeyboardArrowUp
          css={css`
            width: 100%;
            height: 100%;
          `}
        />
      </Button>
    </div>
  );
};

export default About;