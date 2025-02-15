import React from "react";
import { styled } from "@mui/material/styles";
import { IconButton, Typography, Grid2, Link, Popover } from "@mui/material";
import { useSiteMetadata } from "../../../hooks";
import SvgIcons from "../../../utils/SvgIcons";
import { Link as GatsbyLink } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const PREFIX = "Footer";

const classes = {
  footer: `${PREFIX}-footer`,
  snsIcon: `${PREFIX}-snsIcon`,
  qrCodeText: `${PREFIX}-qrCodeText`,
};

const Root = styled("footer")(({ theme }) => ({
  [`&.${classes.footer}`]: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(6),
    padding: theme.spacing(6, 4),
  },

  [`& .${classes.snsIcon}`]: {
    marginRight: theme.spacing(1),
  },

  [`& .${classes.qrCodeText}`]: {
    marginTop: theme.spacing(1),
  },
}));

const Footer = () => {
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
    <Root className={classes.footer}>
      <Grid2 container spacing={3}>
        <Grid2
          item
          size={{ md: 4 }}
          xs={{ display: { xs: "none", md: "block" } }}
        >
          <Typography variant="subtitle1" color="textSecondary">
            <Link component={GatsbyLink} to={"/page"} color="inherit">
              文章
            </Link>
            {" | "}
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
                {index < menu.length - 1 ? " | " : null}
              </React.Fragment>
            ))}
          </Typography>
        </Grid2>
        <Grid2 item size={{ sm: 6, md: 4 }}>
          <IconButton
            className={classes.snsIcon}
            href={contacts.twitter}
            target="_blank"
            rel="noopener"
            size="large"
          >
            <SvgIcons name={"twitter"} />
          </IconButton>
          <IconButton
            className={classes.snsIcon}
            href={contacts.youtube}
            target="_blank"
            rel="noopener"
            size="large"
          >
            <SvgIcons name={"youtube"} />
          </IconButton>
          <IconButton
            className={classes.snsIcon}
            href={contacts.facebook}
            target="_blank"
            rel="noopener"
            size="large"
          >
            <SvgIcons name={"facebook"} />
          </IconButton>
          <IconButton
            className={classes.snsIcon}
            href={contacts.linkedIn}
            target="_blank"
            rel="noopener"
            size="large"
          >
            <SvgIcons name={"linkedIn"} />
          </IconButton>
          <IconButton
            className={classes.snsIcon}
            href={contacts.github}
            target="_blank"
            rel="noopener"
            size="large"
          >
            <SvgIcons name={"github"} />
          </IconButton>
          <IconButton
            className={classes.snsIcon}
            onClick={handleQrClick}
            size="large"
          >
            <SvgIcons name={"wechat"} />
          </IconButton>
          <IconButton
            className={classes.snsIcon}
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
            <Typography align="center" className={classes.qrCodeText}>
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
        </Grid2>
        <Grid2 item size={{ sm: 6, md: 4 }}>
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
        </Grid2>
      </Grid2>
    </Root>
  );
};

export default Footer;
