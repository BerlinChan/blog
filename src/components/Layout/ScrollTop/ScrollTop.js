import React from 'react'
import { styled } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Zoom from '@mui/material/Zoom'
import Fab from '@mui/material/Fab'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const PREFIX = 'ScrollTop';

const classes = {
  scrollToTop: `${PREFIX}-scrollToTop`
};

const StyledZoom = styled(Zoom)({
  [`& .${classes.scrollToTop}`]: {
    position: 'fixed',
    bottom: 16,
    right: 16,
  },
});

const ScrollTop = (props) => {

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = event => {
    window.scrollTo({ top: 0, behavior: 'smooth', })
  }

  return (
    <StyledZoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.scrollToTop}>
        <Fab color="secondary" size="medium" aria-label="scroll back to top">
          <KeyboardArrowUpIcon/>
        </Fab>
      </div>
    </StyledZoom>
  );
}

export default ScrollTop
