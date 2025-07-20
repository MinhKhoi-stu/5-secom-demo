import { grey } from "@mui/material/colors";
import { viVN } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";
// import { viVN as dataGridViVN } from "@mui/x-data-grid/locales";
// import { viVN as datePickersViVN } from "@mui/x-date-pickers/locales";
import { themeStyles } from "./styles";

let textPrimary: string;
let textSecondary: string;
let textDark: string;
let textHint: string;
let background: string;
let paper: string;
let textInversePrimary: string;

textPrimary = textInversePrimary = themeStyles.textPrimary;
textSecondary = themeStyles.textSecondary;
textDark = themeStyles.textDark;
textHint = themeStyles.textHint;

background = themeStyles.backgound;
paper = themeStyles.paper;

export const theme = createTheme(
  {
    direction: "ltr",
    palette: {
      mode: "light",
      common: {
        black: themeStyles.paperDark,
      },
      primary: {
        light: themeStyles.primaryLight,
        main: themeStyles.primary,
        dark: themeStyles.primaryDark,
        100: themeStyles.primary100,
      },
      secondary: {
        light: themeStyles.secondaryLight,
        main: themeStyles.secondary,
        dark: themeStyles.secondaryDark,
      },
      error: {
        light: themeStyles.errorLight,
        main: themeStyles.error,
        dark: themeStyles.errorDark,
      },
      warning: {
        light: themeStyles.warningLight,
        main: themeStyles.warning,
        dark: themeStyles.warningDark,
        contrastText: themeStyles.textLight,
      },
      info: {
        light: themeStyles.infoLight,
        main: themeStyles.info,
        dark: themeStyles.infoDark,
        contrastText: themeStyles.textLight,
      },
      success: {
        light: themeStyles.successLight,
        main: themeStyles.success,
        dark: themeStyles.successDark,
        contrastText: themeStyles.textLight,
      },
      grey: {
        300: themeStyles.grey300,
      },
      text: {
        primary: textPrimary,
        secondary: textSecondary,
      },
      background: {
        paper: paper,
        default: background,
      },
    },
    typography: {
      fontFamily: `'Poppins', sans-serif`,
      h6: {
        fontWeight: 600,
        color: textSecondary,
        fontSize: "0.875rem",
      },
      h5: {
        fontSize: "1.125rem",
        color: textSecondary,
        fontWeight: 600,
      },
      h4: {
        fontSize: "1.25rem",
        color: textSecondary,
        fontWeight: 500,
      },
      h3: {
        fontSize: "1.5rem",
        color: textDark,
        fontWeight: 600,
      },
      h2: {
        fontSize: "2rem",
        color: textDark,
        fontWeight: 600,
      },
      h1: {
        fontSize: "2.2rem",
        color: textDark,
        fontWeight: 600,
      },
      subtitle1: {
        // fontSize: '0.875rem',
        // fontWeight: 500,
        color: textSecondary,
        // lineHeight: '1.643em',
      },
      // subtitle2: {
      //   fontSize: '0.8125rem',
      //   fontWeight: 400,
      // },
      caption: {
        // fontSize: '0.68rem',
        color: textHint,
        // fontWeight: 500,
      },
      // body1: {
      //   fontSize: '0.875rem',
      //   fontWeight: 400,
      //   lineHeight: '1.643em',
      // },
      // body2: {
      //   letterSpacing: '0em',
      //   fontWeight: 400,
      //   lineHeight: '1.643em',
      // },
    },
    components: {
      MuiList: {
        styleOverrides: {
          root: {
            overflow: "hidden",
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: "1.3rem",
          },
          fontSizeInherit: {
            fontSize: "inherit",
          },
          fontSizeLarge: {
            fontSize: "2.1875rem",
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            color: textInversePrimary,
            paddingTop: "12px",
            paddingBottom: "12px",
            // '&.Mui-selected': {
            //   '& .MuiListItemIcon-root': {
            //     color: themeStyles.primary,
            //   },
            //   color: themeStyles.primary,
            //   backgroundColor: themeStyles.menuHover,
            // },
            // '&:hover': {
            //   backgroundColor: themeStyles.menuHover,
            //   color: themeStyles.primary,
            //   '& .MuiListItemIcon-root': {
            //     color: themeStyles.primary,
            //   },
            // },
            // button: {
            //   '&:hover': {
            //     backgroundColor: themeStyles.menuHover,
            //   },
            // },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            color: textInversePrimary,
            paddingTop: "12px",
            paddingBottom: "12px",
            "&.Mui-selected": {
              "& .MuiListItemIcon-root": {
                color: themeStyles.primary,
              },
              color: themeStyles.primary,
              backgroundColor: themeStyles.menuHover,
            },
            "&:hover": {
              backgroundColor: themeStyles.menuHover,
              color: themeStyles.primary,
              "& .MuiListItemIcon-root": {
                color: themeStyles.primary,
              },
            },
            button: {
              "&:hover": {
                backgroundColor: themeStyles.menuHover,
              },
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: "36px",
            color: textInversePrimary,
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            boxShadow: "none",
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            fontSize: "0.875rem",
          },
          content: {
            color: textSecondary,
            fontWeight: 500,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          elevation1: {
            boxShadow:
              "0 4px 6px -2px rgb(0 0 0 / 12%), 0 2px 2px -1px rgb(0 0 0 / 5%)",
          },
          rounded: {
            borderRadius: "10px",
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: {
            color: textDark,
            padding: "24px",
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: "24px",
          },
        },
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            padding: "24px",
          },
        },
      },
      // Table
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "16px 36px 16px 36px",
            whiteSpace: "normal",
          },
          head: {
            padding: "16px 36px 16px 36px",
            color: textDark,
            fontWeight: 600,
          },
          paddingCheckbox: {
            paddingLeft: "18px",
            position: "relative",
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            background: background,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          colorSecondary: {
            color: grey[100],
          },
          colorPrimary: {
            color: grey[100],
          },
          root: {
            color: grey[100],
          },
          outlined: {
            color: grey[500],
          },
          deleteIcon: {
            color: grey[500],
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: themeStyles.textSecondary,
          },
          indeterminate: {
            color: themeStyles.textPrimary,
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            maxWidth: "100%",
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          colorDefault: {
            backgroundColor: themeStyles.textHint,
            color: grey[100],
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            color: textDark,
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          paper: {
            boxShadow:
              "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
          },
        },
      },
    },
  },
  viVN,
  // dataGridViVN,
  // datePickersViVN
);
