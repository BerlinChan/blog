import React from "react";
import {
  IconButton,
  Typography,
  Grid,
  Link,
  Popover,
  useTheme,
} from "@mui/material";
import { useSiteMetadata } from "../../../hooks";
import SvgIcons from "../../../utils/SvgIcons";
import { Link as GatsbyLink } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const Footer = () => {
  const theme = useTheme();
  const [anchorQrEl, setAnchorQrEl] = React.useState(null);

  const {
    author: { contacts },
    menu,
  } = useSiteMetadata();

  function handleQrClick(event) {
    setAnchorQrEl(event.currentTarget);
  }

  function handleQrClose() {
    setAnchorQrEl(null);
  }

  return (
    <footer
      style={{
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(6),
      }}
    >
      <Grid container spacing={3}>
        <Grid
          item
          size={{ md: 4 }}
          sx={{
            display: { xs: "none", md: "flex" },
            flexWrap: "wrap",
            alignItems: "flex-start",
            gap: theme.spacing(1),
          }}
        >
          <Link component={GatsbyLink} to={"/page"} color="inherit">
            文章
          </Link>
          |
          {menu.map((item, index) => (
            <React.Fragment key={item.label}>
              {item.path ? (
                <Link component={GatsbyLink} to={item.path} color="inherit">
                  {item.label}
                </Link>
              ) : (
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener"
                  color="inherit"
                >
                  {item.label}
                </Link>
              )}
              {index < menu.length - 1 ? "|" : null}
            </React.Fragment>
          ))}
        </Grid>
        <Grid item size={{ sm: 6, md: 4 }} sx={{ display: "flex" }}>
          <IconButton
            href={contacts.x}
            target="_blank"
            rel="noopener"
            size="large"
          >
            <SvgIcons name={"x"} />
          </IconButton>
          <IconButton
            href={contacts.youtube}
            target="_blank"
            rel="noopener"
            size="large"
          >
            <SvgIcons name={"youtube"} />
          </IconButton>
          <IconButton
            href={contacts.facebook}
            target="_blank"
            rel="noopener"
            size="large"
          >
            <SvgIcons name={"facebook"} />
          </IconButton>
          <IconButton
            href={contacts.linkedIn}
            target="_blank"
            rel="noopener"
            size="large"
          >
            <SvgIcons name={"linkedIn"} />
          </IconButton>
          <IconButton
            href={contacts.github}
            target="_blank"
            rel="noopener"
            size="large"
          >
            <SvgIcons name={"github"} />
          </IconButton>
          <IconButton onClick={handleQrClick} size="large">
            <SvgIcons name={"wechat"} />
          </IconButton>
          <IconButton
            href={contacts.rss}
            target="_blank"
            rel="noopener"
            size="large"
          >
            <SvgIcons name={"rss"} />
          </IconButton>

          <Popover
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            transformOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={Boolean(anchorQrEl)}
            anchorEl={anchorQrEl}
            onClose={handleQrClose}
          >
            <Typography align="center" sx={{ marginTop: theme.spacing(1) }}>
              公众号“摄影师陈柏林”
            </Typography>
            <StaticImage
              src={"../../../images/wechat_qrcode_for_gh_e9cd709bed60_258.jpg"}
              alt="qrCode"
              layout="fixed"
              width={258}
              height={258}
            />
          </Popover>
        </Grid>
        <Grid item size={{ sm: 6, md: 4 }}>
          <Typography variant="body2" color="textSecondary">
            本站作品采用
            <Link
              color="inherit"
              href={"http://creativecommons.org/licenses/by/4.0/"}
              target="_blank"
              rel="noopener"
            >
              知识共享署名 4.0 国际许可协议
            </Link>
            进行许可。
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
