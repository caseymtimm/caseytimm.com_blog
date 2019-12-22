import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import ReactMarkdown from "react-markdown";
import { Typography, Container, Grid, Button } from "@material-ui/core";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Document, Page, pdfjs } from "react-pdf";
import { ThemeProvider, useTheme, createMuiTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const POST = gql`
  query Post($post: ID!) {
    post(id: $post) {
      ShortText
      slug
      Title
      Image {
        url
      }
      Content
      user {
        FullName
      }
      created_at
      updated_at
    }
  }
`;

function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
}

function Image(props) {
  const width = useWidth();
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

  console.log(props.src);

  return props.src
    .split(/\#|\?/)[0]
    .split(".")
    .pop()
    .trim()
    .toLowerCase() === "pdf" ? (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Document
            file={props.src}
            onLoadSuccess={({ numPages }) => setPages(numPages)}
          >
            <Page
              pageNumber={1}
              width={
                width === "xl"
                  ? 1000
                  : width === "lg"
                  ? 900
                  : width === "md"
                  ? 500
                  : width === "sm"
                  ? 400
                  : 200
              }
            ></Page>
          </Document>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              {page > 1 ? <Button>Previous Page</Button> : <></>}
            </Grid>
            <Grid item>
              Page {page} of {pages}
            </Grid>
            <Grid item>
              {page < pages ? <Button>Next Page</Button> : <></>}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  ) : (
    <img
      alt="Markdown"
      {...props}
      style={{
        maxWidth: "50%",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    />
  );
}

const Post = ({ id, setImage }) => {
  const { loading, error, data } = useQuery(POST, {
    variables: { post: id }
  });

  useEffect(() => {
    if (data)
      setImage(
        data.Image !== "undefined"
          ? `https://cms.caseytimm.com${data.post.Image.url}`
          : undefined
      );
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {/*<Layout
      largeImage={
        data.Image !== "undefined"
          ? `https://cms.caseytimm.com${data.post.Image.url}`
          : undefined
      }
      coverPrecent={25}
    >*/}
      <Container flex>
        <Typography variant="h1" paragraph>
          {data.post.Title}
        </Typography>
        <Typography variant="subtitle">{data.post.ShortText}</Typography>
        <Typography paragraph variant="subtitle">
          by{" "}
          <Link to={`/authors/User_${data.post.user.FullName}`}>
            {data.post.user.FullName}
          </Link>
          {` at ${data.post.created_at}`}
          {data.post.created_at !== data.updated_at
            ? ` and updated at ${data.post.updated_at}`
            : ""}
        </Typography>
        <ReactMarkdown
          source={data.post.Content}
          escapeHtml={false}
          renderers={{ image: Image }}
        />
        <br />
      </Container>
      {/*</Layout>*/}
    </>
  );
};

export default Post;
