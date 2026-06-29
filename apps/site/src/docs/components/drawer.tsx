import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const drawerDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-drawer',
        zh: {
          title: '基础抽屉',
          description: 'open 控制显隐，onClose 用于关闭抽屉。',
          codeToggle: '查看基础抽屉代码',
        },
        en: {
          title: 'Basic drawer',
          description: 'open controls visibility and onClose closes the drawer.',
          codeToggle: 'View basic drawer code',
        },
        code: `import { Button, Drawer } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} title="Recipe detail" onClose={() => setOpen(false)}>
        Drawer content stays in the current workflow.
      </Drawer>
    </>
  );
};`,
        render: () => {
          const BasicDrawerDemo = () => {
            const [open, setOpen] = React.useState(false);

            return (
              <>
                <Cinna.Button onClick={() => setOpen(true)}>Open drawer</Cinna.Button>
                <Cinna.Drawer open={open} title="Recipe detail" onClose={() => setOpen(false)}>
                  Drawer content stays in the current workflow.
                </Cinna.Drawer>
              </>
            );
          };

          return <BasicDrawerDemo />;
        },
      },
      {
        id: 'drawer-placement',
        zh: {
          title: '抽屉方向',
          description: 'placement 支持 left、right、top 和 bottom。',
          codeToggle: '查看抽屉方向代码',
        },
        en: {
          title: 'Placement',
          description: 'placement supports left, right, top, and bottom.',
          codeToggle: 'View drawer placement code',
        },
        code: `import { Button, Drawer, Space } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');

  return (
    <>
      <Space wrap>
        {['left', 'right', 'top', 'bottom'].map((item) => (
          <Button key={item} onClick={() => { setPlacement(item); setOpen(true); }}>
            {item}
          </Button>
        ))}
      </Space>
      <Drawer open={open} placement={placement} title="Placement" onClose={() => setOpen(false)}>
        Current placement: {placement}
      </Drawer>
    </>
  );
};`,
        render: () => {
          const DrawerPlacementDemo = () => {
            const [open, setOpen] = React.useState(false);
            const [placement, setPlacement] = React.useState<'left' | 'right' | 'top' | 'bottom'>('right');
            const placements: Array<'left' | 'right' | 'top' | 'bottom'> = ['left', 'right', 'top', 'bottom'];

            return (
              <>
                <Cinna.Space wrap>
                  {placements.map((item) => (
                    <Cinna.Button
                      key={item}
                      onClick={() => {
                        setPlacement(item);
                        setOpen(true);
                      }}
                    >
                      {item}
                    </Cinna.Button>
                  ))}
                </Cinna.Space>
                <Cinna.Drawer open={open} placement={placement} title="Placement" onClose={() => setOpen(false)}>
                  Current placement: {placement}
                </Cinna.Drawer>
              </>
            );
          };

          return <DrawerPlacementDemo />;
        },
      },
      {
        id: 'drawer-extra',
        zh: {
          title: '额外操作',
          description: 'extra 可在标题栏右侧放置按钮或其他操作。',
          codeToggle: '查看额外操作代码',
        },
        en: {
          title: 'Extra actions',
          description: 'Use extra to place buttons or other commands on the right side of the header.',
          codeToggle: 'View drawer extra code',
        },
        code: `import { Button, Drawer } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open actions</Button>
      <Drawer
        open={open}
        title="Batch actions"
        extra={<Button size="small" variant="primary">Save</Button>}
        onClose={() => setOpen(false)}
      >
        Extra actions sit beside the close control.
      </Drawer>
    </>
  );
};`,
        render: () => {
          const DrawerExtraDemo = () => {
            const [open, setOpen] = React.useState(false);

            return (
              <>
                <Cinna.Button onClick={() => setOpen(true)}>Open actions</Cinna.Button>
                <Cinna.Drawer
                  open={open}
                  title="Batch actions"
                  extra={
                    <Cinna.Button size="small" variant="primary">
                      Save
                    </Cinna.Button>
                  }
                  onClose={() => setOpen(false)}
                >
                  Extra actions sit beside the close control.
                </Cinna.Drawer>
              </>
            );
          };

          return <DrawerExtraDemo />;
        },
      },
      {
        id: 'drawer-size',
        zh: {
          title: '宽度与高度',
          description: 'width 用于左右抽屉，height 用于上下抽屉。',
          codeToggle: '查看宽度与高度代码',
        },
        en: {
          title: 'Width and height',
          description: 'Use width for left or right drawers and height for top or bottom drawers.',
          codeToggle: 'View drawer size code',
        },
        code: `import { Button, Drawer } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open wide drawer</Button>
      <Drawer open={open} title="Wide drawer" width={420} onClose={() => setOpen(false)}>
        Set width for side drawers.
      </Drawer>
    </>
  );
};`,
        render: () => {
          const DrawerSizeDemo = () => {
            const [open, setOpen] = React.useState(false);

            return (
              <>
                <Cinna.Button onClick={() => setOpen(true)}>Open wide drawer</Cinna.Button>
                <Cinna.Drawer open={open} title="Wide drawer" width={420} onClose={() => setOpen(false)}>
                  Set width for side drawers.
                </Cinna.Drawer>
              </>
            );
          };

          return <DrawerSizeDemo />;
        },
      },
      {
        id: 'drawer-mask',
        zh: {
          title: '遮罩关闭',
          description: 'maskClosable={false} 可阻止点击遮罩关闭抽屉。',
          codeToggle: '查看遮罩关闭代码',
        },
        en: {
          title: 'Mask closing',
          description: 'Use maskClosable={false} to prevent closing the drawer by clicking the mask.',
          codeToggle: 'View drawer mask code',
        },
        code: `import { Button, Drawer } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open locked drawer</Button>
      <Drawer
        open={open}
        title="Locked drawer"
        maskClosable={false}
        onClose={() => setOpen(false)}
      >
        The mask will not close this drawer.
      </Drawer>
    </>
  );
};`,
        render: () => {
          const DrawerMaskDemo = () => {
            const [open, setOpen] = React.useState(false);

            return (
              <>
                <Cinna.Button onClick={() => setOpen(true)}>Open locked drawer</Cinna.Button>
                <Cinna.Drawer open={open} title="Locked drawer" maskClosable={false} onClose={() => setOpen(false)}>
                  The mask will not close this drawer.
                </Cinna.Drawer>
              </>
            );
          };

          return <DrawerMaskDemo />;
        },
      },
    ],
  };
