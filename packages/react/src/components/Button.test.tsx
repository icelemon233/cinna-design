import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Cloud button</Button>);
    expect(screen.getByRole('button', { name: 'Cloud button' })).toBeInTheDocument();
  });

  it('marks loading buttons as busy and disabled', () => {
    render(<Button loading loadingSpeed={1200}>Saving</Button>);
    const button = screen.getByRole('button', { name: 'Saving' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveStyle({ '--button-loading-speed': '1200ms' });
  });

  it('renders custom ripple effects when clicked', () => {
    const { container } = render(
      <Button rippleEffects={['outer', 'inner', 'particles']}>Ripple</Button>
    );

    const button = screen.getByRole('button', { name: 'Ripple' });
    button.getBoundingClientRect = () => ({
      x: 0,
      y: 0,
      width: 140,
      height: 40,
      top: 0,
      right: 140,
      bottom: 40,
      left: 0,
      toJSON: () => ({}),
    });

    fireEvent.click(button, {
      clientX: 12,
      clientY: 14,
    });

    const particles = Array.from(container.querySelectorAll<HTMLElement>('.cinna-button__ripple-particle'));

    expect(container.querySelector('.cinna-button__ripple--outer')).toBeInTheDocument();
    expect(container.querySelector('.cinna-button__ripple--inner')).toBeInTheDocument();
    expect(particles.length).toBeGreaterThanOrEqual(18);
    expect(particles.length).toBeLessThanOrEqual(22);
    expect(particles.every((particle) => {
      const x = parseFloat(particle.style.left);
      const y = parseFloat(particle.style.top);
      return x === 0 || x === 140 || y === 0 || y === 40;
    })).toBe(true);
    expect(particles.every((particle) => particle.style.getPropertyValue('--button-particle-angle') === '')).toBe(true);
  });

  it('scales particle count with button width', () => {
    render(
      <>
        <Button rippleEffects="particles">Short</Button>
        <Button rippleEffects="particles">A longer particle button</Button>
      </>
    );

    const shortButton = screen.getByRole('button', { name: 'Short' });
    const longButton = screen.getByRole('button', { name: 'A longer particle button' });
    shortButton.getBoundingClientRect = () => ({
      x: 0,
      y: 0,
      width: 70,
      height: 40,
      top: 0,
      right: 70,
      bottom: 40,
      left: 0,
      toJSON: () => ({}),
    });
    longButton.getBoundingClientRect = () => ({
      x: 0,
      y: 0,
      width: 280,
      height: 40,
      top: 0,
      right: 280,
      bottom: 40,
      left: 0,
      toJSON: () => ({}),
    });

    fireEvent.click(shortButton);
    fireEvent.click(longButton);

    const shortParticleCount = shortButton.querySelectorAll('.cinna-button__ripple-particle').length;
    const longParticleCount = longButton.querySelectorAll('.cinna-button__ripple-particle').length;

    expect(shortParticleCount).toBeGreaterThanOrEqual(13);
    expect(shortParticleCount).toBeLessThanOrEqual(15);
    expect(longParticleCount).toBeGreaterThanOrEqual(36);
    expect(longParticleCount).toBeLessThanOrEqual(44);
    expect(longParticleCount).toBeGreaterThan(shortParticleCount);
  });

  it('supports particle color lists and opacity', () => {
    const particleColors = ['#ef8f8f', '#f6c96d', '#72b866', '#54b6cd'];
    const { container } = render(
      <Button rippleEffects="particles" rippleParticleColors={particleColors} rippleParticleOpacity={0.88}>
        Rainbow
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Rainbow' });
    button.getBoundingClientRect = () => ({
      x: 0,
      y: 0,
      width: 140,
      height: 40,
      top: 0,
      right: 140,
      bottom: 40,
      left: 0,
      toJSON: () => ({}),
    });

    fireEvent.click(button);

    const particles = Array.from(container.querySelectorAll<HTMLElement>('.cinna-button__ripple-particle'));

    expect(button).toHaveStyle({ '--button-particle-opacity': '0.88' });
    expect(particles.length).toBeGreaterThan(0);
    expect(particles.every((particle) => particleColors.includes(particle.style.getPropertyValue('--button-particle-color')))).toBe(true);
  });

  it('supports custom visual variables', () => {
    render(
      <Button
        color="#ffffff"
        backgroundColor="#4567ff"
        borderColor="#123456"
        radius={14}
        shadow="0 6px 0 #54b6cd"
        activeShadow="0 2px 0 #3388a3"
      >
        Custom
      </Button>
    );

    expect(screen.getByRole('button', { name: 'Custom' })).toHaveStyle({
      '--button-color': '#ffffff',
      '--button-bg': '#4567ff',
      '--button-border': '#123456',
      '--button-radius': '14px',
      '--button-shadow': '0 6px 0 #54b6cd',
      '--button-shadow-active': '0 2px 0 #3388a3',
    });
  });

  it('uses theme presets before individual color props', () => {
    render(
      <Button theme="grape" color="#111111" backgroundColor="#222222" borderColor="#333333" shadow="0 1px 0 #444444">
        Preset
      </Button>
    );

    expect(screen.getByRole('button', { name: 'Preset' })).toHaveStyle({
      '--button-color': '#ffffff',
      '--button-bg': '#7a6ff0',
      '--button-border': '#5f56d9',
      '--button-shadow': '0 5px 0 #5b52c8',
    });
  });

  it('supports danger as a series state', () => {
    render(
      <Button variant="ghost" danger>
        Delete
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toHaveClass('cinna-button--ghost');
    expect(button).toHaveClass('cinna-button--danger-tone');
  });
});
