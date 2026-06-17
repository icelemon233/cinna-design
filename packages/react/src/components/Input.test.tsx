import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('connects label and input', () => {
    render(<Input label="Dessert name" placeholder="Cloud tart" />);
    expect(screen.getByLabelText('Dessert name')).toHaveAttribute('placeholder', 'Cloud tart');
  });

  it('announces error state', () => {
    render(<Input label="Email" error="Please enter an email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Please enter an email')).toBeInTheDocument();
  });
});
