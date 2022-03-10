import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';


// -------------------------------------------------------------------------------------
//  Styles overrides
// -------------------------------------------------------------------------------------

export const searchStylesConfig = (theme: Theme) => {
  return {
    inputInput: {
      // position: 'relative',
      display: 'inline-flex',
      padding: theme.spacing(1),
      alignItems: 'center',
      transition: theme.transitions.create('width'),
      width: '30ch',
      '&:focus': {
        width: '50ch',
      },
      fontFamily: 'var(--ion-font-family)',
      fontWeight: 400,
      fontSize: '12px',
    },
  }
};

export const outlinedSelectTextFieldStyleConfig = (theme: Theme) => {
  return {
    paper: {
      maxHeight: '300px',
      marginTop: '-3px',
      borderRadius: '0 0 6px 6px',
      border: '1px solid var(--ion-color-primary)',
      boxShadow: 'none',
      '& ul': {
        margin: 0
      },
      '& li': {
        '&:hover': {
          color: 'var(--ion-color-gray60)',
          backgroundColor: 'rgba(var(--ion-color-primary-rgb), 0.15)',
        },
        fontSize: '12px',
        fontWeight: 400,
        color: 'var(--ion-color-gray30)',
      },
    },
    paperWithErrors: {
      maxHeight: '300px',
      marginTop: '-3px',
      borderRadius: '0 0 6px 6px',
      border: '1px solid var(--ion-color-danger)',
      boxShadow: 'none',
      '& ul': {
        margin: 0
      },
      '& li': {
        '&:hover': {
          color: 'var(--ion-color-gray60)',
          backgroundColor: 'rgba(var(--ion-color-danger-rgb), 0.15)',
        },
        fontSize: '12px',
        fontWeight: 400,
        color: 'var(--ion-color-gray30)',
      },
    },
  }
};

export const formHelperTextStyleConfig = (theme: Theme) => {
  return {
    root: {
      top: '-6px',
      margin: '0 5px',
    },
  }
};

export const formControlFieldsetStyleConfig = (theme: Theme) => {
  return {
    root: {
      border: '1px solid var(--ion-color-gray30)',
      borderRadius: '4px',
      padding: '7px',
      width: 'calc(100% - 16px)',
      margin: '0 8px',
      top: '-6px',
      '&:hover': {
        border: '1px solid var(--ion-color-gray70)',
        '& > legend': {
          color: 'var(--ion-color-gray70)',
        },
        '& > legend.Mui-focused': {
          color: 'var(--ion-color-primary)',
        },
      },
      '&:focus-within': {
        border: '1px solid var(--ion-color-primary)',
        '& > legend': {
          color: 'var(--ion-color-primary)',
        },
      },
    },
    rootWithErrors: {
      border: '1px solid var(--ion-color-danger30)',
      borderRadius: '4px',
      padding: '6px 14px 7px',
      width: 'calc(100% - 16px)',
      margin: '0 8px',
      top: '-6px',
      '&:hover': {
        border: '1px solid var(--ion-color-danger)',
        '& > legend': {
          color: 'var(--ion-color-danger)'
        }
      }
    },
  }
};

export const formControlFieldsetLabelStyleConfig = (theme: Theme) => {
  return {
    root: {
      color: 'var(--ion-color-gray30)',
      transform: 'scale(0.9)',
      padding: '0',
    },
  }
};

export const makeSearchStyles = makeStyles()(searchStylesConfig);
export const makeOutlinedSelectTextFieldStyle = makeStyles()(outlinedSelectTextFieldStyleConfig);
export const makeFormHelperTextStyle = makeStyles()(formHelperTextStyleConfig);
export const makeFormControlFieldsetStyle = makeStyles()(formControlFieldsetStyleConfig);
export const makeFormControlFieldsetLabelStyle = makeStyles()(formControlFieldsetLabelStyleConfig);
