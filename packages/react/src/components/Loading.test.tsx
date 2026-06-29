import { render, screen } from '@testing-library/react';
import { Loading } from './Loading';

describe('Loading', () => {
  it('renders a status label', () => {
    render(<Loading label="Whisking clouds" />);
    expect(screen.getByRole('status')).toHaveTextContent('Whisking clouds');
  });

  it('renders nothing when inactive', () => {
    const { container } = render(<Loading active={false} />);
    expect(container).toBeEmptyDOMElement();
  });
});
