import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MdArrowDropDown } from 'react-icons/md';
import { flex, border, sizes } from '../../styles/presets';
import DividePara from './DividePara';

const GenArticle = ({ data, fold }) => {
  const [test, setTest] = React.useState(false);
  const testa = React.useRef();

  if (data === undefined) {
    return <React.Fragment />;
  }

  const { icon, subject, content, setState } = data;

  return subject.map((sub, i) => {
    // Works 컴포넌트 전용
    if (setState !== undefined) {
      return (
        <article
          key={`article ${i}`}
          css={css`
            ${flex.vertical}
            width: 33%;
          `}
        >
          <img
            key={ `icon ${i}` }
            src={ icon[i] }
            alt="project-preview"
            onClick={setState}
            data-project={`project ${i + 1}`}
            css={css`
              width: 80%;
              max-width: 200px;
              height: 350px;
            `}
          />
          <button
            key={ `button ${i}` }
            onClick={setState}
            data-project={`project ${i + 1}`}
            css={css`
              margin-top: 30px;
            `}
          >{ sub }</button>
        </article>
      );
    }
    // About 전용
    return (
      <article
        key={`article ${i}`}
        css={css`
          margin: 30px auto;
          padding: 0 35px;
          ${flex.vertical}
          align-items: flex-start;
          text-align: justify;
        `}
      >
        <div
          key={ `article ${i}` }
          className="article-header"
          css={css`
            ${flex.horizontal.center}
          `}
        >
          {icon[i] !== undefined ? <img key={ `icon ${i}` } src={ icon[i] } alt="icon-html" /> : ''}
          <h3
            key={ `header ${i}` }
            css={css`
              ${icon[i] === undefined ? '' : 'margin-left: 10px;'}
            `}
          >{ sub }</h3>
          <button
            ref={testa}
            key={`button ${i}`}
            className={`button ${i}`}
            onClick={() => {
              setTest(true);
              console.log(testa.current);
            }}
            css={css`
              margin-left: 7px;
              border: 1px solid transparent;
              border-radius: 50%;
              box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.3);
              display: ${fold ? '' : 'none'};
              ${sizes.free('20px', '20px')};
              cursor: pointer;
              background: white;

              :hover {
                filter: brightness(90%);
              }

              :active {
                transform: scale(0.9);
              }
            `}
          >
            <MdArrowDropDown
              css={css`
                ${sizes.full};
              `}
            />
          </button>
        </div>
        <div
          className="paragraphs-container"
          css={css`
            ${border};
            ${sizes.free('100%', '')};
            min-height: 50px;
          `}
        >
          <DividePara paragraphs={content[i]} fold={fold} spread={test} />
        </div>
      </article>
    );
  });
};

export default GenArticle;