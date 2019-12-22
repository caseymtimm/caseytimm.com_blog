import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import PostBox from "./postBox";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const POSTS = gql`
  {
    posts(sort: "id:desc", where: { Published: true }) {
      id
      Title
      ShortText
      Image {
        url
      }
    }
  }
`;

const useStyles = makeStyles({
  card: {
    height: 110,
    display: "flex"
  },
  content: {
    flex: "1 0 auto"
  },
  postImage: {
    wdith: 151
  },
  details: {
    display: "flex",
    flexDirection: "column"
  }
});

const IndexPage = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(POSTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <Grid container justify="center" spacing={2}>
      {data.posts.map((document, i) => {
        let { Title, ShortText, id, Image } = document;
        return (
          <Grid key={Title + ShortText} item xs={i % 3 === 0 ? 10 : 5}>
            <PostBox
              location={`/post/${id}`}
              title={Title}
              shortText={ShortText}
              image={
                Image ? `https://cms.caseytimm.com${Image.url}` : undefined
              }
            ></PostBox>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default IndexPage;
