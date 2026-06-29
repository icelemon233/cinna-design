import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const formDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-form',
        zh: {
          title: '基本表单',
          description: '使用 Form 和 FormItem 组织标签、输入框、帮助信息和提交按钮。',
          codeToggle: '查看基本表单代码',
        },
        en: {
          title: 'Basic form',
          description: 'Use Form and FormItem to organize labels, fields, help text, and submit actions.',
          codeToggle: 'View basic form code',
        },
        code: `import { Button, Form, FormItem, Input } from '@cinna-design/react';

export default () => (
  <Form onSubmit={(event) => event.preventDefault()}>
    <FormItem label="Project name" required help="Use a short public name.">
      <Input placeholder="Cinna docs" />
    </FormItem>
    <Button htmlType="submit">Create project</Button>
  </Form>
);`,
        render: () => (
          <div style={{ width: 'min(520px, 100%)' }}>
            <Cinna.Form onSubmit={(event) => event.preventDefault()}>
              <Cinna.FormItem label="Project name" required help="Use a short public name.">
                <Cinna.Input placeholder="Cinna docs" />
              </Cinna.FormItem>
              <Cinna.Button htmlType="submit">Create project</Cinna.Button>
            </Cinna.Form>
          </div>
        ),
      },
      {
        id: 'form-layouts',
        zh: {
          title: '表单布局',
          description: 'layout 支持 vertical、horizontal 和 inline，用于不同密度的录入场景。',
          codeToggle: '查看表单布局代码',
        },
        en: {
          title: 'Form layouts',
          description: 'layout supports vertical, horizontal, and inline for different input densities.',
          codeToggle: 'View form layout code',
        },
        code: `import { Button, Form, FormItem, Input, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch" size="large">
    <Form layout="vertical">
      <FormItem label="Vertical">
        <Input placeholder="Stacked label" />
      </FormItem>
    </Form>
    <Form layout="horizontal">
      <FormItem label="Horizontal">
        <Input placeholder="Label beside field" />
      </FormItem>
    </Form>
    <Form layout="inline">
      <FormItem label="Inline">
        <Input placeholder="Compact field" />
      </FormItem>
      <Button>Search</Button>
    </Form>
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="stretch" size="large" style={{ width: 'min(620px, 100%)' }}>
            <Cinna.Form layout="vertical">
              <Cinna.FormItem label="Vertical">
                <Cinna.Input placeholder="Stacked label" />
              </Cinna.FormItem>
            </Cinna.Form>
            <Cinna.Form layout="horizontal">
              <Cinna.FormItem label="Horizontal">
                <Cinna.Input placeholder="Label beside field" />
              </Cinna.FormItem>
            </Cinna.Form>
            <Cinna.Form layout="inline">
              <Cinna.FormItem label="Inline">
                <Cinna.Input placeholder="Compact field" />
              </Cinna.FormItem>
              <Cinna.Button>Search</Cinna.Button>
            </Cinna.Form>
          </Cinna.Space>
        ),
      },
      {
        id: 'form-required-extra',
        zh: {
          title: '必填与辅助信息',
          description: 'FormItem 的 required、help 和 extra 分别展示必填标记、当前提示和补充说明。',
          codeToggle: '查看必填与辅助信息代码',
        },
        en: {
          title: 'Required and helper text',
          description: 'FormItem required, help, and extra render the required mark, current hint, and extra copy.',
          codeToggle: 'View required helper code',
        },
        code: `import { Form, FormItem, Input } from '@cinna-design/react';

export default () => (
  <Form>
    <FormItem
      label="Release alias"
      required
      help="Shown in release notes."
      extra="Keep it under 24 characters."
    >
      <Input placeholder="Cloud breakfast" />
    </FormItem>
  </Form>
);`,
        render: () => (
          <div style={{ width: 'min(520px, 100%)' }}>
            <Cinna.Form>
              <Cinna.FormItem
                label="Release alias"
                required
                help="Shown in release notes."
                extra="Keep it under 24 characters."
              >
                <Cinna.Input placeholder="Cloud breakfast" />
              </Cinna.FormItem>
            </Cinna.Form>
          </div>
        ),
      },
      {
        id: 'form-validation-status',
        zh: {
          title: '校验状态',
          description: 'validateStatus 与 help 搭配，用于展示成功、警告和错误反馈。',
          codeToggle: '查看校验状态代码',
        },
        en: {
          title: 'Validation status',
          description: 'Pair validateStatus with help to show success, warning, and error feedback.',
          codeToggle: 'View validation status code',
        },
        code: `import { Form, FormItem, Input, Space } from '@cinna-design/react';

export default () => (
  <Form>
    <Space direction="vertical" align="stretch">
      <FormItem label="Slug" validateStatus="success" help="This slug is available.">
        <Input value="cloud-note" readOnly />
      </FormItem>
      <FormItem label="Summary" validateStatus="warning" help="A shorter summary will scan better.">
        <Input value="A very detailed launch summary" readOnly />
      </FormItem>
      <FormItem label="Owner" validateStatus="error" help="Owner is required before publishing.">
        <Input placeholder="Choose owner" />
      </FormItem>
    </Space>
  </Form>
);`,
        render: () => (
          <div style={{ width: 'min(540px, 100%)' }}>
            <Cinna.Form>
              <Cinna.Space direction="vertical" align="stretch">
                <Cinna.FormItem label="Slug" validateStatus="success" help="This slug is available.">
                  <Cinna.Input value="cloud-note" readOnly />
                </Cinna.FormItem>
                <Cinna.FormItem label="Summary" validateStatus="warning" help="A shorter summary will scan better.">
                  <Cinna.Input value="A very detailed launch summary" readOnly />
                </Cinna.FormItem>
                <Cinna.FormItem label="Owner" validateStatus="error" help="Owner is required before publishing.">
                  <Cinna.Input placeholder="Choose owner" />
                </Cinna.FormItem>
              </Cinna.Space>
            </Cinna.Form>
          </div>
        ),
      },
      {
        id: 'form-disabled-submit',
        zh: {
          title: '禁用与原生提交',
          description: 'disabled 会让表单整体不可交互，Form 也继承原生 form 的提交属性。',
          codeToggle: '查看禁用与提交代码',
        },
        en: {
          title: 'Disabled and native submit',
          description: 'disabled makes the form non-interactive, and Form also extends native form submit attributes.',
          codeToggle: 'View disabled submit code',
        },
        code: `import { Button, Form, FormItem, Input, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch">
    <Form disabled>
      <FormItem label="Locked name">
        <Input value="Archived project" readOnly />
      </FormItem>
    </Form>
    <Form name="search" onSubmit={(event) => event.preventDefault()}>
      <FormItem label="Keyword">
        <Input name="keyword" placeholder="Search docs" />
      </FormItem>
      <Button htmlType="submit" variant="secondary">Submit</Button>
    </Form>
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="stretch" style={{ width: 'min(540px, 100%)' }}>
            <Cinna.Form disabled>
              <Cinna.FormItem label="Locked name">
                <Cinna.Input value="Archived project" readOnly />
              </Cinna.FormItem>
            </Cinna.Form>
            <Cinna.Form name="search" onSubmit={(event) => event.preventDefault()}>
              <Cinna.FormItem label="Keyword">
                <Cinna.Input name="keyword" placeholder="Search docs" />
              </Cinna.FormItem>
              <Cinna.Button htmlType="submit" variant="secondary">Submit</Cinna.Button>
            </Cinna.Form>
          </Cinna.Space>
        ),
      },
    ],
  };
