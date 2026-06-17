import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Cloud button</Button>);
    expect(screen.getByRole('button', { name: 'Cloud button' })).toBeInTheDocument();
  });

  it('marks loading buttons as busy and disabled', () => {
    render(<Button loading>Saving</Button>);
    const button = screen.getByRole('button', { name: 'Saving' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });
});
