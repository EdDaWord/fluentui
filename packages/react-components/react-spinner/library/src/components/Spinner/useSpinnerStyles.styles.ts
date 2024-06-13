import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SpinnerSlots, SpinnerState } from './Spinner.types';

export const spinnerClassNames: SlotClassNames<SpinnerSlots> = {
  root: 'fui-Spinner',
  spinner: 'fui-Spinner__spinner',
  spinnerTail: 'fui-Spinner__spinnerTail',
  label: 'fui-Spinner__label',
};

/**
 * CSS variables used internally by Spinner
 */
const vars = {
  strokeWidth: '--fui-Spinner--strokeWidth',
};

const useRootBaseClassName = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: '0',
  gap: '8px',
  overflow: 'hidden', // prevents height changes from rotating children
});

const useRootStyles = makeStyles({
  vertical: {
    flexDirection: 'column',
  },
});

const useSpinnerBaseClassName = makeResetStyles({
  position: 'relative',
  flexShrink: 0,

  // Use a mask to create the ring shape of the spinner.
  maskImage:
    `radial-gradient(closest-side, ` +
    `transparent calc(100% - var(${vars.strokeWidth}) - 1px), ` +
    `white calc(100% - var(${vars.strokeWidth})) calc(100% - 1px), ` +
    `transparent 100%)`,

  backgroundColor: `var(--ctrl-token-Spinner-1829, var(--semantic-token-Spinner-1830, ${tokens.colorBrandStroke2Contrast}))`,
  color: `var(--ctrl-token-Spinner-1831, var(--semantic-token-Spinner-1832, ${tokens.colorBrandStroke1}))`,
  '@media screen and (forced-colors: active)': {
    backgroundColor: 'HighlightText',
    color: 'Highlight',
    forcedColorAdjust: 'none',
  },

  animationDuration: '1.5s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'linear',
  animationName: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },

  '@media screen and (prefers-reduced-motion: reduce)': {
    animationDuration: '1.8s',
  },
});

// The spinner tail is rendered using two 135deg arc segments, behind a 105deg arc mask.
// The segments are rotated out from behind the mask to expand the visible arc from
// 30deg (min) to 255deg (max), and then back behind the mask again to shrink the arc.
// The tail and spinner itself also have 360deg rotation animations for the spin.
const useSpinnerTailBaseClassName = makeResetStyles({
  position: 'absolute',
  display: 'block',
  width: '100%',
  height: '100%',
  maskImage: 'conic-gradient(transparent 105deg, white 105deg)',

  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    display: 'block',
    width: '100%',
    height: '100%',
    animation: 'inherit',
    backgroundImage: 'conic-gradient(currentcolor 135deg, transparent 135deg)',
  },

  animationDuration: '1.5s',
  animationIterationCount: 'infinite',
  animationTimingFunction: `var(--ctrl-token-Spinner-1833, var(--semantic-token-Spinner-1834, ${tokens.curveEasyEase}))`,
  animationName: {
    '0%': { transform: 'rotate(-135deg)' },
    '50%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(225deg)' },
  },
  '&::before': {
    animationName: {
      '0%': { transform: 'rotate(0deg)' },
      '50%': { transform: 'rotate(105deg)' },
      '100%': { transform: 'rotate(0deg)' },
    },
  },
  '&::after': {
    animationName: {
      '0%': { transform: 'rotate(0deg)' },
      '50%': { transform: 'rotate(225deg)' },
      '100%': { transform: 'rotate(0deg)' },
    },
  },
  '@media screen and (prefers-reduced-motion: reduce)': {
    animationIterationCount: '0',
    backgroundImage: 'conic-gradient(transparent 120deg, currentcolor 360deg)',
    '&::before, &::after': {
      content: 'none',
    },
  },
});

const useSpinnerStyles = makeStyles({
  inverted: {
    backgroundColor: `var(--ctrl-token-Spinner-1835, var(--semantic-token-Spinner-1836, ${tokens.colorNeutralStrokeAlpha2}))`,
    color: `var(--ctrl-token-Spinner-1837, var(--semantic-token-Spinner-1838, ${tokens.colorNeutralStrokeOnBrand2}))`,
  },

  rtlTail: {
    maskImage: 'conic-gradient(white 255deg, transparent 255deg)',
    '&::before, &::after': {
      backgroundImage: 'conic-gradient(transparent 225deg, currentcolor 225deg)',
    },
    '@media screen and (prefers-reduced-motion: reduce)': {
      backgroundImage: 'conic-gradient(currentcolor 0deg, transparent 240deg)',
    },
  },

  'extra-tiny': {
    height: '16px',
    width: '16px',
    [vars.strokeWidth]: `var(--ctrl-token-Spinner-1839, var(--semantic-token-Spinner-1840, ${tokens.strokeWidthThick}))`,
  },

  tiny: {
    height: '20px',
    width: '20px',
    [vars.strokeWidth]: `var(--ctrl-token-Spinner-1841, var(--semantic-token-Spinner-1842, ${tokens.strokeWidthThick}))`,
  },

  'extra-small': {
    height: '24px',
    width: '24px',
    [vars.strokeWidth]: `var(--ctrl-token-Spinner-1843, var(--semantic-token-Spinner-1844, ${tokens.strokeWidthThick}))`,
  },

  small: {
    height: '28px',
    width: '28px',
    [vars.strokeWidth]: `var(--ctrl-token-Spinner-1845, var(--semantic-token-Spinner-1846, ${tokens.strokeWidthThick}))`,
  },

  medium: {
    height: '32px',
    width: '32px',
    [vars.strokeWidth]: `var(--ctrl-token-Spinner-1847, var(--semantic-token-Spinner-1848, ${tokens.strokeWidthThicker}))`,
  },

  large: {
    height: '36px',
    width: '36px',
    [vars.strokeWidth]: `var(--ctrl-token-Spinner-1849, var(--semantic-token-Spinner-1850, ${tokens.strokeWidthThicker}))`,
  },

  'extra-large': {
    height: '40px',
    width: '40px',
    [vars.strokeWidth]: `var(--ctrl-token-Spinner-1851, var(--semantic-token-Spinner-1852, ${tokens.strokeWidthThicker}))`,
  },

  huge: {
    height: '44px',
    width: '44px',
    [vars.strokeWidth]: `var(--ctrl-token-Spinner-1853, var(--semantic-token-Spinner-1854, ${tokens.strokeWidthThickest}))`,
  },
});

const useLabelStyles = makeStyles({
  inverted: {
    color: `var(--ctrl-token-Spinner-1855, var(--semantic-token-Spinner-1856, ${tokens.colorNeutralForegroundStaticInverted}))`,
  },

  'extra-tiny': {
    ...typographyStyles.body1,
  },

  tiny: {
    ...typographyStyles.body1,
  },

  'extra-small': {
    ...typographyStyles.body1,
  },

  small: {
    ...typographyStyles.body1,
  },

  medium: {
    ...typographyStyles.subtitle2,
  },

  large: {
    ...typographyStyles.subtitle2,
  },

  'extra-large': {
    ...typographyStyles.subtitle2,
  },

  huge: {
    ...typographyStyles.subtitle1,
  },
});

/**
 * Apply styling to the Spinner slots based on the state
 */
export const useSpinnerStyles_unstable = (state: SpinnerState): SpinnerState => {
  const { labelPosition, size, appearance } = state;
  const { dir } = useFluent();

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();
  const spinnerBaseClassName = useSpinnerBaseClassName();
  const spinnerStyles = useSpinnerStyles();
  const spinnerTailBaseClassName = useSpinnerTailBaseClassName();
  const labelStyles = useLabelStyles();

  state.root.className = mergeClasses(
    spinnerClassNames.root,
    rootBaseClassName,
    (labelPosition === 'above' || labelPosition === 'below') && rootStyles.vertical,
    state.root.className,
  );
  if (state.spinner) {
    state.spinner.className = mergeClasses(
      spinnerClassNames.spinner,
      spinnerBaseClassName,
      spinnerStyles[size],
      appearance === 'inverted' && spinnerStyles.inverted,
      state.spinner.className,
    );
  }
  if (state.spinnerTail) {
    state.spinnerTail.className = mergeClasses(
      spinnerClassNames.spinnerTail,
      spinnerTailBaseClassName,
      dir === 'rtl' && spinnerStyles.rtlTail,
      state.spinnerTail.className,
    );
  }
  if (state.label) {
    state.label.className = mergeClasses(
      spinnerClassNames.label,
      labelStyles[size],
      appearance === 'inverted' && labelStyles.inverted,
      state.label.className,
    );
  }

  return state;
};
