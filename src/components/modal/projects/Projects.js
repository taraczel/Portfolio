import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PageBtn from './layouts/PageBtn';
import BodySection from './layouts/BodySection';
import projectsData from '../../../db/projectsData';
import { slideStartPoint } from '../../../modules/customfunctions';
import { isReadyToMoveCreator } from '../../../actions';

const Projects = () => {
  const modalState = useSelector(state => state.modalState);
  const changedValue = useSelector(state => state.isChangingProject);
  const selectedProject = useSelector(state => state.selectedProject);
  const list = useSelector(state => state.projectsList);
  const changeState = useSelector(state => state.isChangeDetected);
  const readyToMove = useSelector(state => state.isReadyToMove);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const makeReady = setTimeout(() => dispatch(isReadyToMoveCreator(false)), 1);
    return () => clearTimeout(makeReady);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyToMove]);

  // React.useEffect(() => {
  //   const foo = document.querySelector('.Projects');
  //   const setTransition = (detail, time = 300) => {
  //     setTimeout(() => {
  //       foo.style.transition = detail;
  //     }, time);
  //   };

  //   if (modalState && !readyToMove) {
  //     foo.style.transition = 'all 0.4s';
  //   }
  //   else {
  //     foo.style.transition = '';
  //   }

  //   return () => clearTimeout(setTransition);
  // }, [modalState, readyToMove]);

  // React.useEffect(() => {
  //   const maxChangeValue = slideStartPoint(headers);
  //   const foo = document.querySelector('.Projects');
  //   if (changeState !== 0 || changeState !== maxChangeValue) {
  //     foo.style.left = '';
  //   }
  // }, [changeState]);

  const { headers } = projectsData;
  // const Bodies = data => headers.map((header, index) => {
  //   const { images, icons, comments } = data;
    
  //   return (
  //     <BodySection
  //       key={index + 1}
  //       header={header}
  //       images={images[header]}
  //       icons={icons[header]}
  //       comments={comments[index]}
  //       className={`Project${index + 1}`}
  //       // selectedNumber={`Project ${index + 1}`}
  //     />
  //   );
  // });
  const Bodies = data => {
    const test = [];
    const { images, icons, comments } = data;
    headers.forEach((header, index) => {
      test.push(
        <BodySection
          key={index + 1}
          header={header}
          images={images[header]}
          icons={icons[header]}
          comments={comments[index]}
          className={`Project${index + 1}`}
        />
      );
    });
    const foo = <BodySection
      key={`cloned ${headers.length - 1}`}
      header={headers[headers.length - 1]}
      images={images[headers[headers.length - 1]]}
      icons={icons[headers[headers.length - 1]]}
      comments={comments[headers.length - 1]}
      className={`Cloned`}
    />;
    const bar = <BodySection
      key={`cloned 1`}
      header={headers[0]}
      images={images[headers[0]]}
      icons={icons[headers[0]]}
      comments={comments[0]}
      className={`Cloned`}
    />;
    const test2 = [foo, ...test, bar];
    return test2;
  };

  return (
    <>
      <PageBtn direction='left' />
      <div className="Projects"
        css={css`
          display: flex;
          width: ${100 * (headers.length + 2)}%;
          height: 100%;
          justify-content: center;
          opacity: ${modalState ? '100%' : '0'};
          transition: ${readyToMove ? '' : 'all 0.4s'};
          // transition: all 0.4s;
          position: relative;
          left: ${slideStartPoint(headers) + changedValue}%;
        `}
      >
        { Bodies(projectsData) }
      </div>
      <PageBtn direction='right' />
    </>
  );
};

export default Projects;