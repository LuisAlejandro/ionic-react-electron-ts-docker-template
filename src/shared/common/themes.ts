import {
  createTheme,
  DeprecatedThemeOptions,
  adaptV4Theme
} from '@mui/material/styles';


// -------------------------------------------------------------------------------------
//  Theme overrides
// -------------------------------------------------------------------------------------

export const adminModalThemeConfig: DeprecatedThemeOptions = {
  palette: {
    secondary: {
      main: '#0057FF',
    },
  },
  overrides: {
    MuiAutocomplete: {
      root: {
        padding: '0',
      },
      paper: {
        maxWidth: '100% !important',
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
      listbox: {
        overflow: 'hidden',
        maxHeight: '4000px'
      },
      option: {
        fontFamily: 'var(--ion-font-family)',
        fontWeight: 400,
        fontSize: '12px',
      },
      input: {
        padding: '14px !important'
      },
      inputRoot: {
        padding: '0 0 0 5px !important'
      },
      popupIndicator: {
        '& > .MuiIconButton-label': {
          '& > .MuiSvgIcon-root': {
            width: '25px',
            height: '25px',
          }
        }

      }
    },
    MuiSlider: {
      root: {
        width: '90%',
        color: 'var(--ion-color-primary)',
        padding: '10px 0 6px 0',
      },
      rail: {
        backgroundColor: 'var(--ion-color-gray70)',
      },
      thumb: {
        backgroundColor: 'var(--ion-color-gray70)',
      },
      valueLabel: {
        left: 'calc(-50% + 2px)',
        top: '-14px',
        '& span': {
          width: '20px',
          height: '20px',
          '& span': {
            fontFamily: 'var(--ion-font-family)',
            fontWeight: 400,
            fontSize: '10px',
            textAlign: 'center',
            paddingTop: '5px',
          },
        },
      },
    },
    MuiListItemText: {
      primary: {
        fontFamily: 'var(--ion-font-family)',
        fontWeight: 400,
        fontSize: '12px',
      },
      secondary: {
        fontFamily: 'var(--ion-font-family)',
        fontWeight: 400,
        fontSize: '10px',
      },
      multiline: {
        marginTop: 0,
        marginBottom: 0
      }
    },
    MuiFormHelperText: {
      root: {
        fontFamily: 'var(--ion-font-family)',
        fontWeight: 400,
        fontSize: '10px !important',
        '&.Mui-error': {
          fontFamily: 'var(--ion-font-family)',
          fontWeight: 400,
          fontSize: '10px !important',
          color: 'var(--ion-color-danger30)',
        },
      },
    },
    MuiFormControl: {
      root: {
        width: '100%',
      },
    },
    MuiFormLabel: {
      root: {
        fontFamily: 'var(--ion-font-family)',
        fontWeight: 400,
        fontSize: '12px',
        color: 'var(--ion-color-gray50)',
        '&.Mui-focused': {
          color: 'var(--ion-color-primary)',
        },
        '&.Mui-error': {
          color: 'var(--ion-color-danger30)',
        },
      },
    },
    MuiPaper: {
      root: {
        color: 'var(--ion-color-gray50)',
      },
      rounded: {
        borderRadius: '0 0 4px 4px',
      },
      outlined: {
        border: '1px solid var(--ion-color-primary)',
      }
    },
    MuiSelect: {
      select: {
        height: '13px',
        minHeight: '13px',
        lineHeight: '13px',
        '&:focus': {
          backgroundColor: 'transparent',
        },
      },
      icon: {
        width: '25px',
        height: '25px',
      },
    },
    MuiChip: {
      root: {
        fontFamily: 'var(--ion-font-family)',
        fontWeight: 400,
        fontSize: '12px',
      },
    },
    MuiRadio: {
      root: {
        color: 'var(--ion-font-gray30)',
        padding: '2px',
      },
    },
    MuiCheckbox: {
      root: {
        color: 'var(--ion-font-gray30)',
        padding: '2px',
      },
    },
    MuiSvgIcon: {
      root: {
        width: '15px',
        height: '15px',
      },
    },
    MuiMenuItem: {
      root: {
        fontFamily: 'var(--ion-font-family)',
        fontWeight: 400,
        fontSize: '12px',
      },
    },
    MuiListItem: {
      root: {
        '&.Mui-selected': {
          '&:hover': {
            color: 'var(--ion-color-black) !important',
            backgroundColor: 'rgba(var(--ion-color-primary-rgb), 0.6) !important',
          },
          color: 'var(--ion-color-black)',
          backgroundColor: 'rgba(var(--ion-color-primary-rgb), 0.6)',
        },
        '&.Mui-focusVisible': {
          color: 'var(--ion-color-gray60)',
          backgroundColor: 'rgba(var(--ion-color-primary-rgb), 0.15)',
        },
      },
    },
    MuiAccordion: {
      root: {
        boxShadow: 'none',
        border: '1px solid var(--ion-color-gray7)',
      },
    },
    MuiAccordionSummary: {
      content: {
        margin: '10px 0',
        '&.Mui-expanded': {
          margin: '10px 0',
        },
      },
    },
    MuiFormGroup: {
      root: {
        width: 'calc(100% - 8px)',
        margin: '0 4px',
      },
    },
    MuiFormControlLabel: {
      root: {
        marginLeft: 0,
      },
      label: {
        fontFamily: 'var(--ion-font-family)',
        fontSize: '12px !important',
        fontWeight: 400,
        color: 'var(--ion-color-gray50)'
      },
    },
    MuiStepIcon: {
      text: {
        fontFamily: 'var(--ion-font-family)',
        fontWeight: 400,
        fontSize: '12px',
        fill: 'var(--ion-color-gray50)',
        strokeWidth: '0px',
      },
      root: {
        fill: '#fff',
        stroke: 'var(--ion-color-gray7)',
        strokeWidth: '1px',
        '&.Mui-active': {
          fill: 'var(--ion-color-primary)',
          color: 'var(--ion-color-primary)',
          strokeWidth: '0px',
          '& .MuiStepIcon-text': {
            fill: '#fff',
          },
        },
        '&.Mui-completed': {
          fill: 'var(--ion-color-success)',
          color: 'var(--ion-color-success)',
          strokeWidth: '0px',
        },
      },
    },
    MuiStepConnector: {
      alternativeLabel: {
        top: '15px',
        left: 'calc(-50% + 10px)',
        right: 'calc(50% + 10px)',
        position: 'absolute',
      },
      line: {
        borderColor: 'var(--ion-color-gray7)',
      },
    },
    MuiStepLabel: {
      label: {
        fontFamily: 'var(--ion-font-family)',
        fontWeight: 400,
        fontSize: '12px',
        color: 'var(--ion-color-gray30)',
        '&$alternativeLabel': {
          marginTop: 5,
        },
        '&.Mui-active': {
          color: 'var(--ion-color-primary)',
          fontWeight: 400,
        },
        '&.Mui-completed': {
          color: 'var(--ion-color-gray30)',
          fontWeight: 400,
        },
      },
    },
    MuiStepper: {
      root: {
        width: '100%',
        padding: '16px',
      },
    },
    MuiOutlinedInput: {
      root: {
        borderWidth: '1px',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--ion-color-gray30)',
          borderWidth: '1px',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--ion-color-gray70)',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--ion-color-primary)',
          borderWidth: '1px',
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--ion-color-danger30)',
        },
        '&.Mui-error:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--ion-color-danger)',
        },
      },
      multiline: {
        padding: '14px',
      },
      inputMultiline: {
        minHeight: '38px',
      },
      input: {
        color: 'var(--ion-color-black)',
        padding: '14px',
      },
    },
    MuiInputLabel: {
      outlined: {
        color: 'var(--ion-color-gray50)',
        transform: 'translate(14px, 15px) scale(1)',
        '&$marginDense': {
          transform: 'translate(14px, 15px) scale(1)',
        },
        '&.MuiInputLabel-shrink': {
          color: 'var(--ion-color-gray30)',
          transform: 'translate(14px, -6px) scale(0.9)',
          '&.Mui-focused': {
            color: 'var(--ion-color-primary)',
            '&.Mui-error': {
              color: 'var(--ion-color-danger)',
            },
          },
        },
      },
    },
    MuiTextField: {
      root: {
        width: 'calc(100% - 16px)',
        margin: '0 8px',
        '&:hover > label': {
          color: 'var(--ion-color-gray70)',
        },
        '&:hover > label.Mui-error': {
          color: 'var(--ion-color-danger)',
        }
      },
    },
    MuiInputBase: {
      input: {
        height: '13px',
        fontFamily: 'var(--ion-font-family)',
        fontWeight: 400,
        fontSize: '12px',
      },
    },
  },
};

export const loginFormThemeConfig: DeprecatedThemeOptions = {
  palette: {
    secondary: {
      main: '#0057FF',
    },
  },
  overrides: {
    MuiFormLabel: {
      root: {
        fontFamily: 'var(--ion-font-family)',
        fontWeight: 400,
        fontSize: '12px',
        color: 'var(--ion-color-gray50)',
        '&.Mui-focused': {
          color: 'var(--ion-color-primary)',
        }
      },
    },
    MuiOutlinedInput: {
      root: {
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--ion-color-primary)',
          }
        },
        '&.Mui-error': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f44336 !important',
          }
        },
      },
      input: {
        padding: '10px 14px'
      },
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 12px) scale(1)',
        '&.MuiInputLabel-shrink': {
          transform: 'translate(14px, -6px) scale(0.9)',
        }
      },
    },
    MuiTextField: {
      root: {
        width: '70%',
      },
    },
    MuiInputBase: {
      input: {
        fontFamily: 'var(--ion-font-family)',
        fontWeight: 400,
        fontSize: '12px',
      }
    },
    MuiFormHelperText: {
      root: {
        fontFamily: 'var(--ion-font-family)',
        fontWeight: 400,
        fontSize: '10px !important',
        '&.Mui-error': {
          fontFamily: 'var(--ion-font-family)',
          fontWeight: 400,
          fontSize: '10px !important',
        }
      }
    },
  },
};

export const adminTableThemeConfig: DeprecatedThemeOptions = {
  palette: {
    secondary: {
      main: '#0057FF',
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        display: 'flex',
        flexDirection: 'column-reverse',
        width: '100%'
      }
    },
    MuiToolbar: {
      root: {
        order: 1,
      }
    },
    MuiTable: {
      root: {
        order: 2,
      }
    },
    // MUIDataTableBody: {
    //   emptyTitle:{
    //     fontFamily: 'var(--ion-font-family)',
    //     fontWeight: 400,
    //     fontSize: '12px',
    //   }
    // },
    MuiTablePagination: {
      root: {
        marginTop: '10px',
        marginBottom: '10px',
      },
      // caption: {
      //   fontFamily: 'var(--ion-font-family)',
      //   fontWeight: 400,
      //   fontSize: '12px',
      // }
    },
    MuiButton: {
      root: {
        fontFamily: 'var(--ion-font-family)',
        fontWeight: 500,
        fontSize: '12px',
        color: 'var(--ion-color-gray50)'
      },
    },
    MuiTableCell: {
      root: {
        fontFamily: 'var(--ion-font-family)',
        fontWeight: 400,
        fontSize: '12px',
        padding: '10px'
      },
      body: {
        color: '#000',
      },
      footer: {
        borderBottom: 0,
        boxShadow: '0px 5px 15px rgba(0, 0, 0, .05)'
      },
    },
  },
};

export const adminTableTheme = createTheme(adaptV4Theme(adminTableThemeConfig));
export const adminModalTheme = createTheme(adaptV4Theme(adminModalThemeConfig));
export const loginFormTheme = createTheme(adaptV4Theme(loginFormThemeConfig));
