import { alpha, Theme } from '@mui/material/styles';


import createStyles from '@mui/styles/createStyles';


// -------------------------------------------------------------------------------------
//  Styles overrides
// -------------------------------------------------------------------------------------

export const setSearchStyles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      display: 'inline-flex',
      width: '96%',
      left: '30px',
      top: '88px',
      zIndex: 2
    },
    searchContainer: {
      position: 'relative',
      display: 'inline-flex',
      width: '80%',
      margin: 0,
      padding: 0,
      alignItems: 'center',
    },
    search: {
      position: 'relative',
      display: 'inline-flex',
      width: 'fit-content',
      margin: 0,
      padding: 0,
      alignItems: 'center',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha('#F9F9FB', 1),
      '&:hover': {
        backgroundColor: alpha('#F9F9FB', 0.75),
      },
    },
    inputInput: {
      position: 'relative',
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
    searchIcon: {
      position: 'relative',
      display: 'inline-flex',
      padding: theme.spacing(1),
      alignItems: 'center',
      pointerEvents: 'none',
    },
    clearIcon: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      padding: theme.spacing(1, 0, 1, 2),
      width: '40px',
      height: '40px',
      margin: 0,
    },
    refreshIcon: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(1, 0, 1, 2),
      width: '20%',
      height: '40px',
      margin: 0,
    },
  });

export const setCreateRequestStepIconStyle = {
  root: {
    width: '30px',
    height: '30px',
    zIndex: 2,
  },
};

export const setCreateSearchbarStyle = {
  root: {
    boxShadow: '0px 5px 15px rgba(0, 0, 0, .1)',
    borderRadius: '6px',
  },
  input: {
    fontSize: '12px',
  }
};

export const setDatePickerSelectScrollStyle = {
  root: {
    maxWidth: '100% !important',
    marginTop: '-3px',
  },
};

export const setRequestDetailsModalStepIconStyle = {
  root: {
    zIndex: 1,
    width: 20,
    height: 20,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--ion-color-primary)',
    backgroundColor: 'var(--ion-color-white)',
  },
  active: {
    backgroundColor: 'var(--ion-color-success)',
    color: 'var(--ion-color-white)',
  },
  completed: {
    backgroundColor: 'var(--ion-color-success)',
    color: 'var(--ion-color-white)',
  },
};

export const setLeftFootRadioStyle = {
  root: {
    '&$checked': {
      color: 'var(--ion-color-secondary) !important',
    },
  },
  labelPlacementStart: {
    marginLeft: '0px',
  },
  checked: {},
};

export const setRightFootRadioStyle = {
  root: {
    '&$checked': {
      color: 'var(--ion-color-tertiary) !important',
    },
  },
  labelPlacementStart: {
    marginLeft: '90px',
  },
  checked: {},
};

export const setOutlinedSelectTextFieldStyle = {
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
};

export const setOutlinedMultilineTextFieldStyle = {
  root: {
    fontSize: '12px',
    fontWeight: 400,
    color: 'var(--ion-color-gray30)',
  },
};

export const setFormHelperTextStyle = {
  root: {
    top: '-6px',
    margin: '0 5px',
  },
};

export const setFormControlFieldsetStyle = {
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
};

export const setFormControlFieldsetLabelStyle = {
  root: {
    color: 'var(--ion-color-gray30)',
    transform: 'scale(0.9)',
    padding: '0',
  },
};

export const setInsoleFormControlFieldsetStyle = {
  root: {
    border: '1px solid var(--ion-color-gray30)',
    borderRadius: '4px',
    padding: '7px',
    width: 'calc(100% - 16px)',
    margin: '0 8px',
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
    '&:hover': {
      border: '1px solid var(--ion-color-danger)',
      '& > legend': {
        color: 'var(--ion-color-danger)'
      }
    }
  },
};

export const setInsoleFormControlFieldsetLabelStyle = {
  root: {
    color: 'var(--ion-color-gray50)',
    transform: 'scale(0.9)',
    padding: '0 5px 5px 5px',
  },
};

export const setSimpleFormControlFieldsetStyle = {
  root: {
    border: 'none',
    borderRadius: 0,
    padding: '7px 0',
    width: '100%',
    margin: 0,
    '&:hover': {
      border: 'none',
      '& > legend': {
        color: 'var(--ion-color-gray50)',
      },
      '& > legend.Mui-focused': {
        color: 'var(--ion-color-gray50)',
      },
    },
    '&:focus-within': {
      border: 'none',
      '& > legend': {
        color: 'var(--ion-color-gray50)',
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
};

export const setSimpleFormHelperTextStyle = {
  root: {
    top: '-6px',
    margin: '0 5px',
  },
};

export const setSimpleFormControlFieldsetLabelStyle = {
  root: {
    color: 'var(--ion-color-gray50)',
    padding: '0',
  },
};

export const setProductSpecsAccordionSummaryStyle = {
  content: {
    margin: '0 !important',
  },
  root: {
    padding: '0 16px 0 0',
  }
};

export const setSimpleToggleButtonGroupStyle = {
  grouped: {
    fontFamily: 'var(--ion-font-family)',
    backgroundColor: 'transparent',
    borderRadius: '5px',
    margin: '5px 10px 0 0',
    border: '1px solid var(--ion-color-gray30)',
    '&.Mui-selected': {
      border: '1px solid var(--ion-color-primary)',
      color: 'var(--ion-color-primary)',
      backgroundColor: 'transparent',
    },
    '&:not(:first-child)': {
      borderRadius: '5px',
      borderLeft: '1px solid var(--ion-color-gray30)',
      marginLeft: '0'
    },
    '&.Mui-selected:not(:first-child)': {
      borderLeft: '1px solid var(--ion-color-primary)',
    },
    '&:first-child': {
      borderRadius: '5px',
    },
  },
};
