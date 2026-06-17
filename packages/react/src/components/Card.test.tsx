import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders title and body', () => {
    render(<Card title="Recipe">Soft cloud cake</Card>);
    expect(screen.getByText('Recipe')).toBeInTheDocument();
    expect(screen.getByText('Soft cloud cake')).toBeInTheDocument();
  });
});
