import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

const PaginationControlledExample = () => {
  const [page, setPage] = React.useState(3);
  const [pageSize, setPageSize] = React.useState(10);

  return (
    <Cinna.Space direction="vertical" align="flex-start">
      <Cinna.Text tone="secondary">Page {page}, {pageSize} items per page</Cinna.Text>
      <Cinna.Pagination
        current={page}
        pageSize={pageSize}
        total={168}
        showSizeChanger
        onChange={(nextPage, nextPageSize) => {
          setPage(nextPage);
          setPageSize(nextPageSize);
        }}
      />
    </Cinna.Space>
  );
};

export const paginationDoc: ComponentDocConfig = {
  examples: [
    {
      id: 'basic-pagination',
      zh: {
        title: '基本用法',
        description: '用于拆分长列表，让用户按页浏览数据。',
        codeToggle: '查看基本用法代码',
      },
      en: {
        title: 'Basic pagination',
        description: 'Split a long list so users can browse data page by page.',
        codeToggle: 'View basic pagination code',
      },
      code: `import { Pagination } from '@cinna-design/react';

export default () => <Pagination total={50} />;`,
      render: () => <Cinna.Pagination total={50} />,
    },
    {
      id: 'more-pagination',
      zh: {
        title: '更多页码',
        description: '页数较多时会自动收起中间页码，并通过省略按钮快速前后跳转。',
        codeToggle: '查看更多页码代码',
      },
      en: {
        title: 'More pages',
        description: 'Long page lists collapse into jump controls for faster navigation.',
        codeToggle: 'View more pages code',
      },
      code: `import { Pagination } from '@cinna-design/react';

export default () => (
  <Pagination total={500} defaultCurrent={6} showLessItems />
);`,
      render: () => <Cinna.Pagination total={500} defaultCurrent={6} showLessItems />,
    },
    {
      id: 'size-align-pagination',
      zh: {
        title: '尺寸与对齐',
        description: 'size 控制分页尺寸，align 控制分页在容器中的起始、居中或末尾对齐。',
        codeToggle: '查看尺寸与对齐代码',
      },
      en: {
        title: 'Size and alignment',
        description: 'Use size for density and align to position the pagination inside its container.',
        codeToggle: 'View size and alignment code',
      },
      code: `import { Icon, Pagination, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch" style={{ width: '100%' }}>
    <Pagination total={80} size="small" align="start" />
    <Pagination total={80} size="medium" align="center" />
    <Pagination total={80} size="large" align="end" />
  </Space>
);`,
      render: () => (
        <Cinna.Space direction="vertical" align="stretch" style={{ width: '100%' }}>
          <Cinna.Pagination total={80} size="small" align="start" />
          <Cinna.Pagination total={80} size="medium" align="center" />
          <Cinna.Pagination total={80} size="large" align="end" />
        </Cinna.Space>
      ),
    },
    {
      id: 'page-size-pagination',
      zh: {
        title: '每页条数',
        description: 'showSizeChanger 展示每页条数选择器，pageSizeOptions 可配置可选项。',
        codeToggle: '查看每页条数代码',
      },
      en: {
        title: 'Page size',
        description: 'showSizeChanger displays the page-size selector and pageSizeOptions controls its options.',
        codeToggle: 'View page size code',
      },
      code: `import { Pagination } from '@cinna-design/react';

export default () => (
  <Pagination
    total={240}
    defaultPageSize={20}
    pageSizeOptions={[10, 20, 40, 80]}
    showSizeChanger
  />
);`,
      render: () => (
        <Cinna.Pagination
          total={240}
          defaultPageSize={20}
          pageSizeOptions={[10, 20, 40, 80]}
          showSizeChanger
        />
      ),
    },
    {
      id: 'quick-jumper-pagination',
      zh: {
        title: '快速跳转',
        description: 'showQuickJumper 允许用户输入页码后回车跳转，也可以配置确认按钮。',
        codeToggle: '查看快速跳转代码',
      },
      en: {
        title: 'Quick jumper',
        description: 'showQuickJumper lets users enter a page number and press Enter or a custom button.',
        codeToggle: 'View quick jumper code',
      },
      code: `import { Pagination } from '@cinna-design/react';

export default () => (
  <Pagination total={360} showQuickJumper={{ goButton: 'Go' }} />
);`,
      render: () => <Cinna.Pagination total={360} showQuickJumper={{ goButton: 'Go' }} />,
    },
    {
      id: 'simple-pagination',
      zh: {
        title: '简洁模式',
        description: 'simple 适合空间有限的区域，readOnly 可以只展示当前页。',
        codeToggle: '查看简洁模式代码',
      },
      en: {
        title: 'Simple mode',
        description: 'Use simple mode in compact areas; readOnly keeps the current page display static.',
        codeToggle: 'View simple mode code',
      },
      code: `import { Pagination, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <Pagination total={88} simple defaultCurrent={2} />
    <Pagination total={88} simple={{ readOnly: true }} defaultCurrent={4} />
  </Space>
);`,
      render: () => (
        <Cinna.Space direction="vertical" align="flex-start">
          <Cinna.Pagination total={88} simple defaultCurrent={2} />
          <Cinna.Pagination total={88} simple={{ readOnly: true }} defaultCurrent={4} />
        </Cinna.Space>
      ),
    },
    {
      id: 'controlled-pagination',
      zh: {
        title: '受控分页',
        description: 'current、pageSize 和 onChange 可以把页码与业务状态绑定在一起。',
        codeToggle: '查看受控分页代码',
      },
      en: {
        title: 'Controlled pagination',
        description: 'Bind current, pageSize, and onChange to application state.',
        codeToggle: 'View controlled pagination code',
      },
      code: `import { Pagination, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [page, setPage] = useState(3);
  const [pageSize, setPageSize] = useState(10);

  return (
    <Space direction="vertical" align="flex-start">
      <Text tone="secondary">Page {page}, {pageSize} items per page</Text>
      <Pagination
        current={page}
        pageSize={pageSize}
        total={168}
        showSizeChanger
        onChange={(nextPage, nextPageSize) => {
          setPage(nextPage);
          setPageSize(nextPageSize);
        }}
      />
    </Space>
  );
};`,
      render: () => <PaginationControlledExample />,
    },
    {
      id: 'total-hidden-pagination',
      zh: {
        title: '总数与隐藏',
        description: 'showTotal 展示当前页范围；hideOnSinglePage 可在只有一页时隐藏分页器。',
        codeToggle: '查看总数与隐藏代码',
      },
      en: {
        title: 'Total and hiding',
        description: 'showTotal displays the visible range; hideOnSinglePage hides the control for one-page data.',
        codeToggle: 'View total and hiding code',
      },
      code: `import { Pagination, Space, Text } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <Pagination
      total={128}
      pageSize={16}
      defaultCurrent={2}
      showTotal={(total, range) => \`\${range[0]}-\${range[1]} of \${total}\`}
    />
    <Text tone="secondary">The next pagination is hidden because it has one page.</Text>
    <Pagination total={8} hideOnSinglePage />
  </Space>
);`,
      render: () => (
        <Cinna.Space direction="vertical" align="flex-start">
          <Cinna.Pagination
            total={128}
            pageSize={16}
            defaultCurrent={2}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
          />
          <Cinna.Text tone="secondary">The next pagination is hidden because it has one page.</Cinna.Text>
          <Cinna.Pagination total={8} hideOnSinglePage />
        </Cinna.Space>
      ),
    },
    {
      id: 'all-pages-pagination',
      zh: {
        title: '全部展示',
        description: 'showAllPages 可展示完整页码，适合页数不多且需要快速扫视的列表。',
        codeToggle: '查看全部展示代码',
      },
      en: {
        title: 'Show all pages',
        description: 'showAllPages keeps every page visible when the page count is still manageable.',
        codeToggle: 'View show all pages code',
      },
      code: `import { Pagination } from '@cinna-design/react';

export default () => <Pagination total={120} showAllPages />;`,
      render: () => <Cinna.Pagination total={120} showAllPages />,
    },
    {
      id: 'custom-pagination',
      zh: {
        title: '自定义页码样式和图标',
        description: '可以自定义页码字体、边框、圆角、激活态颜色、当前页横条，以及上一页和下一页图标。',
        codeToggle: '查看自定义页码样式和图标代码',
      },
      en: {
        title: 'Custom page style and icons',
        description: 'Customize page font, border, radius, active color, active underline, and previous or next icons.',
        codeToggle: 'View custom style and icons code',
      },
      code: `import { Pagination, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <Pagination
      total={96}
      defaultCurrent={4}
      prevIcon={<Icon name="chevron-left" size={13} />}
      nextIcon={<Icon name="chevron-right" size={13} />}
      pageFontSize={15}
      pageFontWeight={800}
      pageColor="#6b584b"
      pageBorderColor="#efb8c8"
      pageBorderWidth={2}
      pageRadius={12}
      activePageColor="#513323"
      activePageBackgroundColor="#ffe8a8"
      activePageBorderColor="#d8984f"
      activePageUnderlineColor="#fff8cf"
      activePageUnderlineWidth={28}
      activePageUnderlineHeight={4}
      activePageUnderlineBottom={6}
    />
    <Pagination
      total={96}
      defaultCurrent={4}
      prevIcon={<Icon name="chevron-left" size={13} />}
      nextIcon={<Icon name="chevron-right" size={13} />}
      pageFontSize={15}
      pageFontWeight={800}
      pageColor="#6b584b"
      pageBorderColor="#efb8c8"
      pageBorderWidth={2}
      pageRadius={12}
      activePageColor="#513323"
      activePageBackgroundColor="#ffe8a8"
      activePageBorderColor="#d8984f"
      activePageUnderline={false}
    />
  </Space>
);`,
      render: () => (
        <Cinna.Space direction="vertical" align="flex-start">
          <Cinna.Pagination
            total={96}
            defaultCurrent={4}
            prevIcon={<Cinna.Icon name="chevron-left" size={13} />}
            nextIcon={<Cinna.Icon name="chevron-right" size={13} />}
            pageFontSize={15}
            pageFontWeight={800}
            pageColor="#6b584b"
            pageBorderColor="#efb8c8"
            pageBorderWidth={2}
            pageRadius={12}
            activePageColor="#513323"
            activePageBackgroundColor="#ffe8a8"
            activePageBorderColor="#d8984f"
            activePageUnderlineColor="#fff8cf"
            activePageUnderlineWidth={28}
            activePageUnderlineHeight={4}
            activePageUnderlineBottom={6}
          />
          <Cinna.Pagination
            total={96}
            defaultCurrent={4}
            prevIcon={<Cinna.Icon name="chevron-left" size={13} />}
            nextIcon={<Cinna.Icon name="chevron-right" size={13} />}
            pageFontSize={15}
            pageFontWeight={800}
            pageColor="#6b584b"
            pageBorderColor="#efb8c8"
            pageBorderWidth={2}
            pageRadius={12}
            activePageColor="#513323"
            activePageBackgroundColor="#ffe8a8"
            activePageBorderColor="#d8984f"
            activePageUnderline={false}
          />
        </Cinna.Space>
      ),
    },
    {
      id: 'disabled-pagination',
      zh: {
        title: '不可用',
        description: 'disabled 会禁用页码、上一页下一页、输入框和每页条数选择器。',
        codeToggle: '查看不可用代码',
      },
      en: {
        title: 'Disabled',
        description: 'disabled turns off page buttons, navigation buttons, inputs, and the page-size selector.',
        codeToggle: 'View disabled code',
      },
      code: `import { Pagination } from '@cinna-design/react';

export default () => (
  <Pagination total={180} defaultCurrent={5} showSizeChanger showQuickJumper disabled />
);`,
      render: () => (
        <Cinna.Pagination total={180} defaultCurrent={5} showSizeChanger showQuickJumper disabled />
      ),
    },
  ],
};
