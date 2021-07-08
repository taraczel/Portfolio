import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { flex } from '../../../../styles/presets';
import { selectedProjectCreator, isReadyToMoveCreator, isChangingProjectCreator } from '../../../../actions';
import projectsData from '../../../../db/projectsData';
import { slideStartPoint, debouncer } from '../../../../modules/customfunctions';

const PageBtn = ({ direction }) => {
  const current = useSelector(state => state.selectedProject);
  const list = useSelector(state => state.projectsList);
  const changeState = useSelector(state => state.isChangingProject);
  const selectedProject = useSelector(state => state.selectedProject);
  const readyToMove = useSelector(state => state.isReadyToMove);
  const dispatch = useDispatch();
  const { headers } = projectsData;

  const maxChangeValue = slideStartPoint(headers);

  // React.useEffect(() => {
  //   let timer;
  //   document.querySelectorAll('button').forEach(button => button.addEventListener('click', e => {
  //     if (!timer) {
  //       timer = setTimeout(() => {
  //         timer = null;
  //         e.preventDefault();
  //         e.stopPropagation();
  //       }, 10);
  //     }
  //   }));
  // }, []);

  React.useEffect(() => {
    const foo = document.querySelectorAll('button');
    foo.forEach(bar => bar.addEventListener('dblclick', e => {
      e.preventDefault();
      e.stopPropagation();
    }))
  }, []);

  const updateNextProjectState = btnText => {
    const projectText = current.split(' ')[0];
    let projectNumber = Number(current.split(' ')[1]);
    projectNumber = btnText === '▶' ? projectNumber + 1 : projectNumber - 1;
    if (projectNumber <= 0) {
      projectNumber = list.length;
    } else if (projectNumber > list.length) {
      projectNumber = 1;
    }
    const test = [projectText, projectNumber].join(' ');
    dispatch(selectedProjectCreator(test));
  };

  const changeActualProject = btnText => {
    if (readyToMove) return;
    if (btnText === '▶') {
      if (-changeState === maxChangeValue * 2) {
        dispatch(isChangingProjectCreator(changeState-100));
        setTimeout(() => dispatch(isChangingProjectCreator(0)), 370);
        setTimeout(() => dispatch(isReadyToMoveCreator(true)), 371);
      } else {
        dispatch(isChangingProjectCreator(changeState-100));
      }
    } else if (btnText === '◀') {
      if (changeState === 0) {
        dispatch(isChangingProjectCreator(changeState+100));
        setTimeout(() => dispatch(isChangingProjectCreator(-maxChangeValue * 2)), 370);
        setTimeout(() => dispatch(isReadyToMoveCreator(true)), 371);
      } else {
        dispatch(isChangingProjectCreator(changeState+100));
      }
    }
  };

  const btnText = direction === 'left' ? '◀' : '▶';

  return (
    <div
      className={`container ${direction}`}
      css={css`
        ${flex.vertical}
        z-index: 2;
      `}
    >
      <button
        className={`btn ${direction}`}
        css={css`
          border: 1px solid transparent;
          box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.3);
          width: 50px;
          height: 50px;
          position: absolute;
          top: 45%;
          ${direction === 'left' ? 'left: 0;' : 'right: 0;'};
        `}
        onClick={() => {
          updateNextProjectState(btnText);
          changeActualProject(btnText);
        }}
      >{ btnText }</button>
    </div>
  );
};

export default PageBtn;