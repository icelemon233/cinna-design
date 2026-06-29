import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const modalDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-modal',
        zh: {
          title: '基础对话框',
          description: 'open 控制显隐，onCancel 与 onOk 用于关闭或提交。',
          codeToggle: '查看基础对话框代码',
        },
        en: {
          title: 'Basic modal',
          description: 'open controls visibility, while onCancel and onOk handle closing or submitting.',
          codeToggle: 'View basic modal code',
        },
        code: `import { Button, Modal } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        title="Recipe review"
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        Review the latest recipe changes before publishing.
      </Modal>
    </>
  );
};`,
        render: () => {
          const BasicModalDemo = () => {
            const [open, setOpen] = React.useState(false);

            return (
              <>
                <Cinna.Button onClick={() => setOpen(true)}>Open modal</Cinna.Button>
                <Cinna.Modal open={open} title="Recipe review" onCancel={() => setOpen(false)} onOk={() => setOpen(false)}>
                  Review the latest recipe changes before publishing.
                </Cinna.Modal>
              </>
            );
          };

          return <BasicModalDemo />;
        },
      },
      {
        id: 'modal-button-text',
        zh: {
          title: '按钮文案',
          description: 'okText 与 cancelText 可替换默认底部按钮文案。',
          codeToggle: '查看按钮文案代码',
        },
        en: {
          title: 'Button text',
          description: 'Use okText and cancelText to replace the default footer button copy.',
          codeToggle: 'View modal button text code',
        },
        code: `import { Button, Modal } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Publish menu</Button>
      <Modal
        open={open}
        title="Publish menu?"
        okText="Publish"
        cancelText="Keep editing"
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        Customers will see the new seasonal menu immediately.
      </Modal>
    </>
  );
};`,
        render: () => {
          const ModalButtonTextDemo = () => {
            const [open, setOpen] = React.useState(false);

            return (
              <>
                <Cinna.Button onClick={() => setOpen(true)}>Publish menu</Cinna.Button>
                <Cinna.Modal
                  open={open}
                  title="Publish menu?"
                  okText="Publish"
                  cancelText="Keep editing"
                  onCancel={() => setOpen(false)}
                  onOk={() => setOpen(false)}
                >
                  Customers will see the new seasonal menu immediately.
                </Cinna.Modal>
              </>
            );
          };

          return <ModalButtonTextDemo />;
        },
      },
      {
        id: 'modal-custom-footer',
        zh: {
          title: '自定义页脚',
          description: 'footer 可完全替换默认操作区。',
          codeToggle: '查看自定义页脚代码',
        },
        en: {
          title: 'Custom footer',
          description: 'footer can fully replace the default action area.',
          codeToggle: 'View modal footer code',
        },
        code: `import { Button, Modal, Space } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open footer</Button>
      <Modal
        open={open}
        title="Custom footer"
        onCancel={() => setOpen(false)}
        footer={
          <Space>
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Save draft</Button>
          </Space>
        }
      >
        Replace the default footer with any ReactNode.
      </Modal>
    </>
  );
};`,
        render: () => {
          const ModalFooterDemo = () => {
            const [open, setOpen] = React.useState(false);

            return (
              <>
                <Cinna.Button onClick={() => setOpen(true)}>Open footer</Cinna.Button>
                <Cinna.Modal
                  open={open}
                  title="Custom footer"
                  onCancel={() => setOpen(false)}
                  footer={
                    <Cinna.Space>
                      <Cinna.Button onClick={() => setOpen(false)}>Close</Cinna.Button>
                      <Cinna.Button variant="primary" onClick={() => setOpen(false)}>
                        Save draft
                      </Cinna.Button>
                    </Cinna.Space>
                  }
                >
                  Replace the default footer with any ReactNode.
                </Cinna.Modal>
              </>
            );
          };

          return <ModalFooterDemo />;
        },
      },
      {
        id: 'modal-mask',
        zh: {
          title: '遮罩关闭',
          description: 'maskClosable={false} 可阻止点击遮罩关闭对话框。',
          codeToggle: '查看遮罩关闭代码',
        },
        en: {
          title: 'Mask closing',
          description: 'Use maskClosable={false} to prevent closing the modal by clicking the mask.',
          codeToggle: 'View modal mask code',
        },
        code: `import { Button, Modal } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open locked modal</Button>
      <Modal
        open={open}
        title="Confirm carefully"
        maskClosable={false}
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        The mask will not close this dialog.
      </Modal>
    </>
  );
};`,
        render: () => {
          const ModalMaskDemo = () => {
            const [open, setOpen] = React.useState(false);

            return (
              <>
                <Cinna.Button onClick={() => setOpen(true)}>Open locked modal</Cinna.Button>
                <Cinna.Modal
                  open={open}
                  title="Confirm carefully"
                  maskClosable={false}
                  onCancel={() => setOpen(false)}
                  onOk={() => setOpen(false)}
                >
                  The mask will not close this dialog.
                </Cinna.Modal>
              </>
            );
          };

          return <ModalMaskDemo />;
        },
      },
      {
        id: 'modal-width-centered',
        zh: {
          title: '宽度与位置',
          description: 'width 设置对话框宽度，centered 控制是否居中展示。',
          codeToggle: '查看宽度与位置代码',
        },
        en: {
          title: 'Width and position',
          description: 'width sets the dialog width and centered controls centered display.',
          codeToggle: 'View modal width code',
        },
        code: `import { Button, Modal } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open wide modal</Button>
      <Modal
        open={open}
        title="Wide review"
        width={680}
        centered
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        Wider dialogs are useful for denser review content.
      </Modal>
    </>
  );
};`,
        render: () => {
          const ModalWidthDemo = () => {
            const [open, setOpen] = React.useState(false);

            return (
              <>
                <Cinna.Button onClick={() => setOpen(true)}>Open wide modal</Cinna.Button>
                <Cinna.Modal
                  open={open}
                  title="Wide review"
                  width={680}
                  centered
                  onCancel={() => setOpen(false)}
                  onOk={() => setOpen(false)}
                >
                  Wider dialogs are useful for denser review content.
                </Cinna.Modal>
              </>
            );
          };

          return <ModalWidthDemo />;
        },
      },
    ],
  };
