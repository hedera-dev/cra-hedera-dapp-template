import { Box } from '@mui/material';
import BuiltOnHedera from "../assets/built-on-hedera.svg";

export default function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        className='footer'
      >
          <img 
            src={BuiltOnHedera}
            alt='An upper case H with a line through the top and the text Build on Hedera'
            className='builtOnHederaSVG'
          />
      </Box>
    </Box>
  );
}