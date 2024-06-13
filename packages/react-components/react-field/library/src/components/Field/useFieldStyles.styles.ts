import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { FieldSlots, FieldState } from './Field.types';

export const fieldClassNames: SlotClassNames<FieldSlots> = {
  root: `fui-Field`,
  label: `fui-Field__label`,
  validationMessage: `fui-Field__validationMessage`,
  validationMessageIcon: `fui-Field__validationMessageIcon`,
  hint: `fui-Field__hint`,
};

// Size of the icon in the validation message
const iconSize = '12px';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    display: 'grid',
  },

  // In horizontal layout, the field is a grid with the label taking up the entire first column.
  // The last row is slack space in case the label is taller than the rest of the content.
  horizontal: {
    gridTemplateColumns: '33% 1fr',
    gridTemplateRows: 'auto auto auto 1fr',
  },

  // In horizontal layout without a label, replace the label's column with padding.
  // This lets grid auto-flow properly place the other children, and keeps fields with and without labels aligned.
  horizontalNoLabel: {
    paddingLeft: '33%',
    gridTemplateColumns: '1fr',
  },
});

const useLabelStyles = makeStyles({
  vertical: {
    paddingTop: `var(--ctrl-token-Field-1103, var(--semantic-token-Field-1104, ${tokens.spacingVerticalXXS}))`,
    paddingBottom: `var(--ctrl-token-Field-1105, var(--semantic-token-Field-1106, ${tokens.spacingVerticalXXS}))`,
    marginBottom: `var(--ctrl-token-Field-1107, var(--semantic-token-Field-1108, ${tokens.spacingVerticalXXS}))`,
  },

  verticalLarge: {
    paddingTop: '1px',
    paddingBottom: '1px',
    marginBottom: `var(--ctrl-token-Field-1109, var(--semantic-token-Field-1110, ${tokens.spacingVerticalXS}))`,
  },

  horizontal: {
    paddingTop: `var(--ctrl-token-Field-1111, var(--semantic-token-Field-1112, ${tokens.spacingVerticalSNudge}))`,
    paddingBottom: `var(--ctrl-token-Field-1113, var(--semantic-token-Field-1114, ${tokens.spacingVerticalSNudge}))`,
    marginRight: `var(--ctrl-token-Field-1115, var(--semantic-token-Field-1116, ${tokens.spacingHorizontalM}))`,
    gridRowStart: '1',
    gridRowEnd: '-1',
  },

  horizontalSmall: {
    paddingTop: `var(--ctrl-token-Field-1117, var(--semantic-token-Field-1118, ${tokens.spacingVerticalXS}))`,
    paddingBottom: `var(--ctrl-token-Field-1119, var(--semantic-token-Field-1120, ${tokens.spacingVerticalXS}))`,
  },

  horizontalLarge: {
    // To align the label text with the Input text, it should be centered within the 40px height of the Input.
    // This is (40px - lineHeightBase400) / 2 = 9px. Hardcoded since there is no 9px padding token.
    paddingTop: '9px',
    paddingBottom: '9px',
  },
});

const useSecondaryTextBaseClassName = makeResetStyles({
  marginTop: `var(--ctrl-token-Field-1121, var(--semantic-token-Field-1122, ${tokens.spacingVerticalXXS}))`,
  color: `var(--ctrl-token-Field-1123, var(--semantic-token-Field-1124, ${tokens.colorNeutralForeground3}))`,
  ...typographyStyles.caption1,
});

const useSecondaryTextStyles = makeStyles({
  error: {
    color: `var(--ctrl-token-Field-1125, var(--semantic-token-Field-1126, ${tokens.colorPaletteRedForeground1}))`,
  },

  withIcon: {
    // Add a gutter for the icon, to allow multiple lines of text to line up to the right of the icon.
    paddingLeft: `calc(${iconSize} + ${tokens.spacingHorizontalXS})`,
  },
});

const useValidationMessageIconBaseClassName = makeResetStyles({
  display: 'inline-block',
  fontSize: iconSize,
  // Negative left margin puts the icon in the gutter of the validation message div's withIcon style.
  marginLeft: `calc(-${iconSize} - ${tokens.spacingHorizontalXS})`,
  marginRight: `var(--ctrl-token-Field-1127, var(--semantic-token-Field-1128, ${tokens.spacingHorizontalXS}))`,
  // Line height of 0 prevents the verticalAlign from affecting the line height of the text.
  lineHeight: '0',
  // Negative verticalAlign shifts the inline icon down to align with the text (effectively top padding).
  verticalAlign: '-1px',
});

const useValidationMessageIconStyles = makeStyles({
  error: {
    color: `var(--ctrl-token-Field-1129, var(--semantic-token-Field-1130, ${tokens.colorPaletteRedForeground1}))`,
  },
  warning: {
    color: `var(--ctrl-token-Field-1131, var(--semantic-token-Field-1132, ${tokens.colorPaletteDarkOrangeForeground1}))`,
  },
  success: {
    color: `var(--ctrl-token-Field-1133, var(--semantic-token-Field-1134, ${tokens.colorPaletteGreenForeground1}))`,
  },
});

/**
 * Apply styling to the Field slots based on the state
 */
export const useFieldStyles_unstable = (state: FieldState): FieldState => {
  const { validationState, size } = state;
  const horizontal = state.orientation === 'horizontal';

  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    fieldClassNames.root,
    rootStyles.base,
    horizontal && rootStyles.horizontal,
    horizontal && !state.label && rootStyles.horizontalNoLabel,
    state.root.className,
  );

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      fieldClassNames.label,
      horizontal && labelStyles.horizontal,
      horizontal && size === 'small' && labelStyles.horizontalSmall,
      horizontal && size === 'large' && labelStyles.horizontalLarge,
      !horizontal && labelStyles.vertical,
      !horizontal && size === 'large' && labelStyles.verticalLarge,
      state.label.className,
    );
  }

  const validationMessageIconBaseClassName = useValidationMessageIconBaseClassName();
  const validationMessageIconStyles = useValidationMessageIconStyles();
  if (state.validationMessageIcon) {
    state.validationMessageIcon.className = mergeClasses(
      fieldClassNames.validationMessageIcon,
      validationMessageIconBaseClassName,
      validationState !== 'none' && validationMessageIconStyles[validationState],
      state.validationMessageIcon.className,
    );
  }

  const secondaryTextBaseClassName = useSecondaryTextBaseClassName();
  const secondaryTextStyles = useSecondaryTextStyles();
  if (state.validationMessage) {
    state.validationMessage.className = mergeClasses(
      fieldClassNames.validationMessage,
      secondaryTextBaseClassName,
      validationState === 'error' && secondaryTextStyles.error,
      !!state.validationMessageIcon && secondaryTextStyles.withIcon,
      state.validationMessage.className,
    );
  }

  if (state.hint) {
    state.hint.className = mergeClasses(fieldClassNames.hint, secondaryTextBaseClassName, state.hint.className);
  }

  return state;
};
