import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const tableDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-table',
        zh: {
          title: '基本表格',
          description: '通过 columns 描述列，通过 dataSource 提供行数据。',
          codeToggle: '查看基本表格代码',
        },
        en: {
          title: 'Basic table',
          description: 'Describe columns with columns and provide rows with dataSource.',
          codeToggle: 'View basic table code',
        },
        code: `import { Table } from '@cinna-design/react';

const columns = [
  { title: 'Component', dataIndex: 'component' },
  { title: 'Owner', dataIndex: 'owner' },
  { title: 'Status', dataIndex: 'status' },
];

const dataSource = [
  { key: 'button', component: 'Button', owner: 'Design', status: 'Ready' },
  { key: 'table', component: 'Table', owner: 'Docs', status: 'Review' },
  { key: 'modal', component: 'Modal', owner: 'Product', status: 'Draft' },
];

export default () => <Table columns={columns} dataSource={dataSource} />;`,
        render: () => {
          type Row = { key: string; component: string; owner: string; status: string };
          const columns: Cinna.TableColumn<Row>[] = [
            { title: 'Component', dataIndex: 'component' },
            { title: 'Owner', dataIndex: 'owner' },
            { title: 'Status', dataIndex: 'status' },
          ];
          const dataSource: Row[] = [
            { key: 'button', component: 'Button', owner: 'Design', status: 'Ready' },
            { key: 'table', component: 'Table', owner: 'Docs', status: 'Review' },
            { key: 'modal', component: 'Modal', owner: 'Product', status: 'Draft' },
          ];

          return <Cinna.Table columns={columns} dataSource={dataSource} />;
        },
      },
      {
        id: 'table-render-align',
        zh: {
          title: '自定义渲染与对齐',
          description: 'render 可自定义单元格内容，align 和 width 控制列的展示方式。',
          codeToggle: '查看自定义渲染代码',
        },
        en: {
          title: 'Custom render and alignment',
          description: 'render customizes cells, while align and width control column presentation.',
          codeToggle: 'View render alignment code',
        },
        code: `import { Table, Tag } from '@cinna-design/react';

const columns = [
  { title: 'Task', dataIndex: 'task', width: 180 },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (value) => <Tag color={value === 'Ready' ? 'pistachio' : 'butter'}>{value}</Tag>,
  },
  { title: 'Score', dataIndex: 'score', align: 'right' },
];

const dataSource = [
  { key: '1', task: 'Docs pass', status: 'Ready', score: 98 },
  { key: '2', task: 'Visual review', status: 'Review', score: 86 },
];

export default () => <Table columns={columns} dataSource={dataSource} />;`,
        render: () => {
          type Row = { key: string; task: string; status: 'Ready' | 'Review'; score: number };
          const columns: Cinna.TableColumn<Row>[] = [
            { title: 'Task', dataIndex: 'task', width: 180 },
            {
              title: 'Status',
              dataIndex: 'status',
              render: (value) => <Cinna.Tag color={value === 'Ready' ? 'pistachio' : 'butter'}>{String(value)}</Cinna.Tag>,
            },
            { title: 'Score', dataIndex: 'score', align: 'right' },
          ];
          const dataSource: Row[] = [
            { key: '1', task: 'Docs pass', status: 'Ready', score: 98 },
            { key: '2', task: 'Visual review', status: 'Review', score: 86 },
          ];

          return <Cinna.Table columns={columns} dataSource={dataSource} />;
        },
      },
      {
        id: 'table-sorter',
        zh: {
          title: '列排序',
          description: '为列设置 sorter 后，点击表头可以在升序和降序之间切换。',
          codeToggle: '查看列排序代码',
        },
        en: {
          title: 'Column sorting',
          description: 'Set sorter on a column to toggle ascending and descending order from the header.',
          codeToggle: 'View sorter code',
        },
        code: `import { Table } from '@cinna-design/react';

const columns = [
  { title: 'Component', dataIndex: 'component', sorter: (a, b) => a.component.localeCompare(b.component) },
  { title: 'Score', dataIndex: 'score', align: 'right', sorter: (a, b) => a.score - b.score },
];

const dataSource = [
  { key: 'input', component: 'Input', score: 91 },
  { key: 'button', component: 'Button', score: 98 },
  { key: 'card', component: 'Card', score: 94 },
];

export default () => <Table columns={columns} dataSource={dataSource} />;`,
        render: () => {
          type Row = { key: string; component: string; score: number };
          const columns: Cinna.TableColumn<Row>[] = [
            { title: 'Component', dataIndex: 'component', sorter: (a, b) => a.component.localeCompare(b.component) },
            { title: 'Score', dataIndex: 'score', align: 'right', sorter: (a, b) => a.score - b.score },
          ];
          const dataSource: Row[] = [
            { key: 'input', component: 'Input', score: 91 },
            { key: 'button', component: 'Button', score: 98 },
            { key: 'card', component: 'Card', score: 94 },
          ];

          return <Cinna.Table columns={columns} dataSource={dataSource} />;
        },
      },
      {
        id: 'table-selection-row-key',
        zh: {
          title: '行选择与 rowKey',
          description: 'rowSelection 启用行选择，rowKey 可指定每行的稳定 key。',
          codeToggle: '查看行选择代码',
        },
        en: {
          title: 'Row selection and rowKey',
          description: 'rowSelection enables row selection, and rowKey defines the stable key for each row.',
          codeToggle: 'View row selection code',
        },
        code: `import { Space, Table, Text } from '@cinna-design/react';
import { useState, type Key } from 'react';

const columns = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Name', dataIndex: 'name' },
];

const dataSource = [
  { id: 'button', name: 'Button docs' },
  { id: 'table', name: 'Table docs' },
  { id: 'tag', name: 'Tag docs' },
];

export default () => {
  const [selected, setSelected] = useState<Key[]>(['button']);

  return (
    <Space direction="vertical" align="stretch">
      <Table rowKey="id" columns={columns} dataSource={dataSource} rowSelection={{ selectedRowKeys: selected, onChange: setSelected }} />
      <Text tone="secondary">Selected: {selected.join(', ')}</Text>
    </Space>
  );
};`,
        render: () => {
          type Row = { id: string; name: string };
          const TableSelectionDemo = () => {
            const [selected, setSelected] = React.useState<React.Key[]>(['button']);
            const columns: Cinna.TableColumn<Row>[] = [
              { title: 'ID', dataIndex: 'id' },
              { title: 'Name', dataIndex: 'name' },
            ];
            const dataSource: Row[] = [
              { id: 'button', name: 'Button docs' },
              { id: 'table', name: 'Table docs' },
              { id: 'tag', name: 'Tag docs' },
            ];

            return (
              <Cinna.Space direction="vertical" align="stretch">
                <Cinna.Table
                  rowKey="id"
                  columns={columns}
                  dataSource={dataSource}
                  rowSelection={{ selectedRowKeys: selected, onChange: setSelected }}
                />
                <Cinna.Text tone="secondary">Selected: {selected.join(', ')}</Cinna.Text>
              </Cinna.Space>
            );
          };

          return <TableSelectionDemo />;
        },
      },
      {
        id: 'table-bordered-empty-size',
        zh: {
          title: '边框、尺寸与空态',
          description: 'bordered 显示表格边框，size 调整单元格密度，emptyText 定义无数据文案。',
          codeToggle: '查看边框尺寸代码',
        },
        en: {
          title: 'Border, size, and empty state',
          description: 'bordered shows table borders, size adjusts density, and emptyText customizes empty copy.',
          codeToggle: 'View border size code',
        },
        code: `import { Table } from '@cinna-design/react';

const columns = [
  { title: 'Component', dataIndex: 'component' },
  { title: 'Status', dataIndex: 'status' },
];

export default () => (
  <Table
    bordered
    size="small"
    columns={columns}
    dataSource={[]}
    emptyText="No components found"
  />
);`,
        render: () => {
          type Row = { key: string; component: string; status: string };
          const columns: Cinna.TableColumn<Row>[] = [
            { title: 'Component', dataIndex: 'component' },
            { title: 'Status', dataIndex: 'status' },
          ];

          return <Cinna.Table bordered size="small" columns={columns} dataSource={[]} emptyText="No components found" />;
        },
      },
    ],
  };
