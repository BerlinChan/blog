import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Link from "@material-ui/core/Link";
import { useSiteMetadata } from "../../../hooks";
import SvgIcons from "../../../assets/SvgIcons";
import { Link as GatsbyLink } from "gatsby";
import Popover from "@material-ui/core/Popover";
import { StaticImage } from "gatsby-plugin-image";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(6),
    padding: theme.spacing(6, 4),
  },
  snsIcon: {
    marginRight: theme.spacing(1),
  },
  qrCodeText: {
    marginTop: theme.spacing(1),
  },
}));

const Footer = () => {
  const [anchorQrEl, setAnchorQrEl] = React.useState(null);
  const classes = useStyles();
  const {
    author: { contacts },
    menu,
  } = useSiteMetadata();
  const fuxkId = [
    "鄂",
    "I",
    "C",
    "P",
    "备",
    "1",
    "6",
    "0",
    "0",
    "7",
    "5",
    "8",
    "6",
    "号",
    "-",
    "1",
  ];

  function handleQrClick(event) {
    setAnchorQrEl(event.currentTarget);
  }

  function handleQrClose() {
    setAnchorQrEl(null);
  }

  return (
    <footer className={classes.footer}>
      <Grid container spacing={3}>
        <Hidden smDown>
          <Grid item md={4}>
            <Typography variant="subtitle1" color="textSecondary">
              <Link component={GatsbyLink} to={"/page"} color="inherit">
                文章
              </Link>
              {" | "}
              {menu.map((item, index) => (
                <React.Fragment key={index}>
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
          </Grid>
        </Hidden>
        <Grid item sm={6} md={4}>
          <IconButton
            className={classes.snsIcon}
            href={contacts.twitter}
            target="_blank"
            rel="noopener"
          >
            <SvgIcons name={"twitter"} />
          </IconButton>
          <IconButton
            className={classes.snsIcon}
            href={contacts.youtube}
            target="_blank"
            rel="noopener"
          >
            <SvgIcons name={"youtube"} />
          </IconButton>
          <IconButton
            className={classes.snsIcon}
            href={contacts.facebook}
            target="_blank"
            rel="noopener"
          >
            <SvgIcons name={"facebook"} />
          </IconButton>
          <IconButton
            className={classes.snsIcon}
            href={contacts.linkedIn}
            target="_blank"
            rel="noopener"
          >
            <SvgIcons name={"linkedIn"} />
          </IconButton>
          <IconButton
            className={classes.snsIcon}
            href={contacts.github}
            target="_blank"
            rel="noopener"
          >
            <SvgIcons name={"github"} />
          </IconButton>
          <IconButton className={classes.snsIcon} onClick={handleQrClick}>
            <SvgIcons name={"wechat"} />
          </IconButton>
          <IconButton
            className={classes.snsIcon}
            href={contacts.rss}
            target="_blank"
            rel="noopener"
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
            <Typography align={"center"} className={classes.qrCodeText}>
              公众号“摄影师陈柏林”
            </Typography>
            <StaticImage
              src={
                "../../../../static/media/qrcode_for_gh_e9cd709bed60_258.jpg"
              }
              alt="qrCode"
              width={258}
              height={258}
            />
          </Popover>
        </Grid>
        <Grid item sm={6} md={4}>
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
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ cursor: "pointer" }}
            onClick={() =>
              window.open(
                `http://${["www", "beian", "miit", "gov", "cn"].join(".")}/`
              )
            }
          >
            {fuxkId.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
