import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const carouselDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-carousel',
        zh: {
          title: '基本轮播',
          description: 'items 传入一组同级内容，Carousel 会以横向轮播方式展示。',
          codeToggle: '查看基本轮播代码',
        },
        en: {
          title: 'Basic carousel',
          description: 'Pass peer content through items and Carousel will show it as a horizontal carousel.',
          codeToggle: 'View basic carousel code',
        },
        code: `import { Carousel } from '@cinna-design/react';

const slides = ['Cloud cake', 'Berry soda', 'Mint tart'];

export default () => (
  <Carousel
    items={slides.map((title) => (
      <div className="demo-carousel-slide">{title}</div>
    ))}
  />
);`,
        render: () => {
          const slides = ['Cloud cake', 'Berry soda', 'Mint tart'];

          return (
            <Cinna.Carousel
              items={slides.map((title) => (
                <div key={title} className="demo-carousel-slide">
                  {title}
                </div>
              ))}
            />
          );
        },
      },
      {
        id: 'carousel-autoplay',
        zh: {
          title: '自动切换',
          description: 'autoplay 开启定时切换，autoplaySpeed 控制每次切换间隔。',
          codeToggle: '查看自动切换代码',
        },
        en: {
          title: 'Autoplay',
          description: 'Use autoplay for timed switching and autoplaySpeed for the interval.',
          codeToggle: 'View autoplay carousel code',
        },
        code: `import { Carousel } from '@cinna-design/react';

export default () => (
  <Carousel
    autoplay
    autoplaySpeed={1800}
    items={[
      <div className="demo-carousel-slide">Morning batch</div>,
      <div className="demo-carousel-slide">Afternoon tasting</div>,
      <div className="demo-carousel-slide">Evening pickup</div>,
    ]}
  />
);`,
        render: () => (
          <Cinna.Carousel
            autoplay
            autoplaySpeed={1800}
            items={[
              <div key="morning" className="demo-carousel-slide">
                Morning batch
              </div>,
              <div key="afternoon" className="demo-carousel-slide">
                Afternoon tasting
              </div>,
              <div key="evening" className="demo-carousel-slide">
                Evening pickup
              </div>,
            ]}
          />
        ),
      },
      {
        id: 'carousel-arrows',
        zh: {
          title: '切换箭头',
          description: 'arrows 控制左右切换按钮，适合需要明确手动翻页的内容区。',
          codeToggle: '查看切换箭头代码',
        },
        en: {
          title: 'Arrows',
          description: 'Use arrows to show previous and next controls for manual switching.',
          codeToggle: 'View carousel arrows code',
        },
        code: `import { Carousel } from '@cinna-design/react';

export default () => (
  <Carousel
    arrows
    items={[
      <div className="demo-carousel-slide">Recipe card</div>,
      <div className="demo-carousel-slide">Prep notes</div>,
      <div className="demo-carousel-slide">Delivery window</div>,
    ]}
  />
);`,
        render: () => (
          <Cinna.Carousel
            arrows
            items={[
              <div key="recipe" className="demo-carousel-slide">
                Recipe card
              </div>,
              <div key="prep" className="demo-carousel-slide">
                Prep notes
              </div>,
              <div key="delivery" className="demo-carousel-slide">
                Delivery window
              </div>,
            ]}
          />
        ),
      },
      {
        id: 'carousel-dots',
        zh: {
          title: '指示点',
          description: 'dots 控制底部指示点，可在更紧凑的区域里关闭。',
          codeToggle: '查看指示点代码',
        },
        en: {
          title: 'Dots',
          description: 'Use dots to control bottom indicators, or hide them in compact areas.',
          codeToggle: 'View carousel dots code',
        },
        code: `import { Carousel } from '@cinna-design/react';

export default () => (
  <Carousel
    dots={false}
    items={[
      <div className="demo-carousel-slide">Dense panel</div>,
      <div className="demo-carousel-slide">Quiet update</div>,
    ]}
  />
);`,
        render: () => (
          <Cinna.Carousel
            dots={false}
            items={[
              <div key="dense" className="demo-carousel-slide">
                Dense panel
              </div>,
              <div key="quiet" className="demo-carousel-slide">
                Quiet update
              </div>,
            ]}
          />
        ),
      },
      {
        id: 'carousel-after-change',
        zh: {
          title: '初始页与回调',
          description: 'defaultActiveIndex 设置初始页，afterChange 在页签切换后返回当前索引。',
          codeToggle: '查看初始页与回调代码',
        },
        en: {
          title: 'Initial slide and callback',
          description: 'defaultActiveIndex sets the initial slide and afterChange returns the active index.',
          codeToggle: 'View initial slide code',
        },
        code: `import { Carousel, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [active, setActive] = useState(1);

  return (
    <>
      <Carousel
        defaultActiveIndex={1}
        afterChange={setActive}
        items={[
          <div className="demo-carousel-slide">Step 1</div>,
          <div className="demo-carousel-slide">Step 2</div>,
          <div className="demo-carousel-slide">Step 3</div>,
        ]}
      />
      <Text tone="secondary">Active slide: {active + 1}</Text>
    </>
  );
};`,
        render: () => {
          const CarouselCallbackDemo = () => {
            const [active, setActive] = React.useState(1);

            return (
              <Cinna.Space direction="vertical" align="stretch">
                <Cinna.Carousel
                  defaultActiveIndex={1}
                  afterChange={setActive}
                  items={[
                    <div key="step-1" className="demo-carousel-slide">
                      Step 1
                    </div>,
                    <div key="step-2" className="demo-carousel-slide">
                      Step 2
                    </div>,
                    <div key="step-3" className="demo-carousel-slide">
                      Step 3
                    </div>,
                  ]}
                />
                <Cinna.Text tone="secondary">Active slide: {active + 1}</Cinna.Text>
              </Cinna.Space>
            );
          };

          return <CarouselCallbackDemo />;
        },
      },
    ],
  };
