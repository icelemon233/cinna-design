import { render, screen } from '@testing-library/react';
import { CinnaLoading } from './CinnaLoading';

describe('CinnaLoading', () => {
  it('renders a status label', () => {
    render(<CinnaLoading label="Whisking clouds" />);
    expect(screen.getByRole('status')).toHaveTextContent('Whisking clouds');
  });

  it('renders nothing when inactive', () => {
    const { container } = render(<CinnaLoading active={false} />);
    expect(container).toBeEmptyDOMElement();
  });
});
