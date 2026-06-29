import * as Cinna from '@cinna-design/react';
import type { DemoButtonOptions } from '../types';

const buttonPreviewOptions: Record<string, DemoButtonOptions[][]> = {
  variants: [[
    { label: 'Primary', icon: '*' },
    { label: 'Secondary', variant: 'secondary' },
    { label: 'Cream', variant: 'cream' },
    { label: 'Ghost', variant: 'ghost' },
    { label: 'Dashed', variant: 'dashed', icon: '*', iconPosition: 'end' },
    { label: 'Text', variant: 'text' },
  ]],
  sizes: [[
    { label: 'Small', size: 'small' },
    { label: 'Medium' },
    { label: 'Large', size: 'large' },
  ]],
  loading: [[
    { label: 'Fast 420ms', loading: true, loadingSpeed: 420 },
    { label: 'Normal 760ms', loading: true, loadingSpeed: 760 },
    { label: 'Slow 1.4s', loading: true, loadingSpeed: '1.4s' },
  ]],
  disabled: [[
    { label: 'Disabled', disabled: true },
    { label: 'Unavailable', variant: 'secondary', disabled: true },
    { label: 'Danger disabled', variant: 'ghost', danger: true, disabled: true },
  ]],
  'danger-series': [[
    { label: 'Primary danger', danger: true },
    { label: 'Secondary danger', variant: 'secondary', danger: true },
    { label: 'Cream danger', variant: 'cream', danger: true },
    { label: 'Ghost danger', variant: 'ghost', danger: true },
    { label: 'Dashed danger', variant: 'dashed', danger: true },
    { label: 'Text danger', variant: 'text', danger: true },
  ]],
  icons: [[
    { label: 'Cloud action', icon: '~' },
    { label: 'Add sparkle', variant: 'dashed', icon: '*', iconPosition: 'end' },
    { variant: 'primary', shape: 'circle', icon: '~' },
  ]],
  'custom-style': [[
    {
      label: 'Grape cloud',
      color: '#ffffff',
      backgroundColor: '#7A6FF0',
      borderColor: '#5F56D9',
      radius: 14,
      shadow: '0 6px 0 #54B6CD',
      activeShadow: '0 2px 0 #3388A3',
    },
    {
      label: 'Berry soft',
      backgroundColor: '#FFF0F7',
      borderColor: '#EA8A98',
      radius: '18px',
      shadow: '0 5px 0 #62B9D4',
      activeShadow: '0 2px 0 #3D8EAA',
    },
  ]],
  'theme-presets': [[
    { label: 'Sky', theme: 'sky' },
    { label: 'Butter', theme: 'butter' },
    { label: 'Berry', theme: 'berry' },
    { label: 'Mint', theme: 'mint' },
    { label: 'Grape', theme: 'grape' },
    { label: 'Peach', theme: 'peach' },
    { label: 'Cream', theme: 'cream' },
    { label: 'Cocoa', theme: 'cocoa' },
    { label: 'Ocean', theme: 'ocean' },
    { label: 'Blossom', theme: 'blossom' },
  ]],
  'custom-ripple': [[
    { label: 'Outer ring', rippleEffects: 'outer' },
    { label: 'Click ripple', rippleEffects: 'inner' },
    { label: 'Particles', rippleEffects: 'particles' },
    {
      label: 'Rainbow particles',
      rippleEffects: 'particles',
      rippleParticleColors: ['#ef8f8f', '#f6c96d', '#72b866', '#54b6cd', '#7a6ff0'],
      rippleParticleOpacity: 0.92,
    },
    { label: 'All effects', rippleEffects: ['outer', 'inner', 'particles'] },
  ]],
  block: [[{ label: 'Publish recipe', block: true }]],
};

const DemoButton = ({ label, icon, ...options }: DemoButtonOptions) => (
  <Cinna.Button
    variant={options.variant}
    size={options.size}
    shape={options.shape}
    icon={icon}
    iconPosition={options.iconPosition}
    loading={options.loading}
    loadingSpeed={options.loadingSpeed}
    disabled={options.disabled}
    block={options.block}
    danger={options.danger}
    ripple={options.ripple}
    rippleEffects={options.rippleEffects}
    rippleParticleColors={options.rippleParticleColors}
    rippleParticleOpacity={options.rippleParticleOpacity}
    theme={options.theme}
    color={options.color}
    backgroundColor={options.backgroundColor}
    borderColor={options.borderColor}
    radius={options.radius}
    shadow={options.shadow}
    activeShadow={options.activeShadow}
    aria-label={!label && icon ? icon : undefined}
  >
    {label}
  </Cinna.Button>
);

export const ButtonExamplePreview = ({ id }: { id: string }) => {
  const rows = buttonPreviewOptions[id] ?? [];
  const isBlock = id === 'block';

  if (isBlock) {
    return (
      <div className="button-example-block">
        <DemoButton {...rows[0]?.[0]} />
      </div>
    );
  }

  return (
    <>
      {rows.map((row, index) => (
        <div key={`${id}-${index}`} className="button-example-row">
          {row.map((button, buttonIndex) => (
            <DemoButton key={`${button.label ?? button.icon ?? 'icon'}-${buttonIndex}`} {...button} />
          ))}
        </div>
      ))}
    </>
  );
};
