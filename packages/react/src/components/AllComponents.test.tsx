import { act, fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Alert, Carousel, Mentions, Modal, Notification, Progress, RadioGroup, Switch, Table, Tabs, Tag, Tree } from './AllComponents';

describe('AllComponents', () => {
  it('renders data display primitives', () => {
    render(
      <>
        <Tag>Cloud</Tag>
        <Progress percent={42} />
        <Table columns={[{ title: 'Name', dataIndex: 'name' }]} dataSource={[{ key: 'cloud', name: 'Cloud' }]} />
      </>
    );

    expect(screen.getAllByText('Cloud')).toHaveLength(2);
    expect(screen.getByText('42%')).toBeInTheDocument();
  });

  it('closes closable tags and notifications', () => {
    render(
      <>
        <Tag closable>Berry</Tag>
        <Notification title="Published" content="Ready" closable />
      </>
    );

    fireEvent.click(screen.getByLabelText('Close tag'));
    expect(screen.queryByText('Berry')).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Close notification'));
    expect(screen.queryByText('Ready')).not.toBeInTheDocument();
  });

  it('supports controlled-like selection components', () => {
    render(<RadioGroup defaultValue="a" options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }]} />);
    expect(screen.getByLabelText('A')).toBeChecked();
  });

  it('switch toggles when clicked', () => {
    render(<Switch aria-label="soft switch" />);
    const control = screen.getByRole('switch', { name: 'soft switch' });
    fireEvent.click(control);
    expect(control).toHaveAttribute('aria-checked', 'true');
  });

  it('inserts mention options into the textarea', () => {
    render(<Mentions options={['cloud']} defaultValue="Invite" />);
    fireEvent.click(screen.getByRole('button', { name: '@cloud' }));
    expect(screen.getByRole('textbox')).toHaveValue('Invite @cloud ');
  });

  it('supports uncontrolled tree selection', () => {
    render(<Tree selectable treeData={[{ key: 'root', title: 'Root', children: [{ key: 'leaf', title: 'Leaf' }] }]} />);
    const leaf = screen.getByRole('button', { name: 'Leaf' });
    fireEvent.click(leaf);
    expect(leaf).toHaveClass('cinna-tree__node--selected');
  });

  it('autoplays carousel slides', () => {
    vi.useFakeTimers();
    const { container } = render(<Carousel autoplay autoplaySpeed={1000} items={['One', 'Two']} />);
    const track = container.querySelector('.cinna-carousel__track');

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(track).toHaveStyle({ transform: 'translateX(-100%)' });
    vi.useRealTimers();
  });

  it('renders overlays and tabs', () => {
    render(
      <>
        <Alert message="Saved" />
        <Modal open title="Recipe">
          Modal content
        </Modal>
        <Tabs items={[{ key: 'one', label: 'One', children: 'Panel one' }]} />
      </>
    );

    expect(screen.getByRole('dialog')).toHaveTextContent('Modal content');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
  });
});
