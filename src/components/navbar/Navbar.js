import React, { useEffect, useState, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
// import { styled } from '@mui/material/styles';

import { Link, useLocation } from 'react-router-dom';
import NavbarDrawer from './NavbarDrawer';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import myResume from '../../assets/Resume_Alona_Vladymyrova_07_19_23.pdf';
const StyledTabs = (props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
);

const StyledTab = (props) => <Tab disableRipple {...props} />;
// const StyledTabs = styled((props) => (
//   <Tabs
//     {...props}
//     TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
//   />
// ))({
//   // '& .MuiTabs-indicator': {
//   //   display: 'flex',
//   //   justifyContent: 'center',
//   //   backgroundColor: 'transparent',
//   // },
//   // '& .MuiTabs-indicatorSpan': {
//   //   maxWidth: 40,
//   //   width: '100%',
//   //   backgroundColor: 'red',
//   // },
// });

// const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
//   ({ theme }) => ({
//     // textTransform: 'none',
//     // fontWeight: theme.typography.fontWeightRegular,
//     // fontSize: theme.typography.pxToRem(15),
//     marginRight: theme.spacing(1),
//     color: 'fff',
//     '&.Mui-selected': {
//       color: 'fff',
//     },
//     // '&.Mui-focusVisible': {
//     //   backgroundColor: 'red',
//     // },
//   })
// );

const transparentNavbarStyle = {
  backgroundColor: 'transparent', // Make the background transparent
  boxShadow: 'none', // Remove the shadow
};

// const initialNavbarStyle = {
//   transform: 'translateY(-100%)',
//   opacity: 0, // Initial opacity is set to 0
//   transition:
//     'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.9s ease-in-out',
// };
// const visibleNavbarStyle = {
//   transform: 'translateY(0)',
//   opacity: 1, // When visible, opacity is set to 1
//   transition:
//     'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.9s ease-in-out',
// };

const Navbar = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = useState(false);
  // A flag to check if it's the first render
  const isFirstRender = useRef(true);
  const location = useLocation();
  // const [navbarVisible, setNavbarVisible] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const pathToValue = {
      '/': 0,
      '/project': 1,
      '/about': 2,
      '/contact': 3,
    };
    if (!isFirstRender.current) {
      if (location.pathname in pathToValue) {
        setValue(pathToValue[location.pathname]);
      }
    } else {
      // Set the navbar to be visible with an animation
      // setNavbarVisible(true);
      isFirstRender.current = false;
    }
  }, [location.pathname]);

  return (
    <>
      <AppBar
        position="absolute"
        // style={navbarVisible ? visibleNavbarStyle : initialNavbarStyle}
        style={transparentNavbarStyle}
      >
        <Toolbar>
          <Typography
            variant="h8"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ textTransform: 'uppercase' }}
          >
            Alona
          </Typography>
          {isMatch ? (
            <>
              <Typography>Menu</Typography>
              <NavbarDrawer />
            </>
          ) : (
            <>
              <StyledTabs
                textColor="inherit"
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                sx={{
                  '& .MuiTabs-indicatorSpan': { backgroundColor: 'white' },
                }}
              >
                <StyledTab label="Home" component={Link} to="/" />
                <StyledTab label="Projects" component={Link} to="/project" />
                <StyledTab label="About" component={Link} to="/about" />
                <StyledTab label="Contact" component={Link} to="/contact" />
                {/* <Tab
                label={
                  <>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        fontSize: '0.875rem',
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      }}
                    >
                      <PictureAsPdfIcon
                        style={{ fontSize: 'inherit', marginRight: '2px' }}
                      />
                      Resume
                    </div>
                  </>
                }
                component="a"
                href={myResume}
                target="_blank"
                rel="noreferrer"
              /> */}
                {/* <Tab
              key={4}
              label={
                <Button
                  variant="contained"
                  color="secondary"
                  href={myResume}
                  target="_blank"
                  rel="noreferrer"
                >
                  Resume
                </Button>
              }
            /> */}
              </StyledTabs>
              <Button
                style={{ marginLeft: '1rem', color: 'white' }}
                // variant="text"
                // color="inherit"
                variant="contained"
                color="secondary"
                // startIcon={<PictureAsPdfIcon />}
                endIcon={<KeyboardArrowRightIcon />}
                href={myResume}
                target="_blank"
                rel="noreferrer"
              >
                Resume
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
