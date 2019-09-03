import { graphql } from 'gatsby'
import * as PropTypes from 'prop-types'
import React from 'react'

import Layout from '../components/Layout'
import Navigation from '../components/Navigation'
import Post from '../components/Post'
import Seo from '../components/Seo'

const Index = ({
  data: { allMarkdownRemark: { edges: posts } },
  pageContext: { nextPagePath, previousPagePath },
}) => (
  <>
    <Seo />
    <Layout>
      {posts.map(({ node }) => {
        const {
          id,
          excerpt: autoExcerpt,
          frontmatter: {
            title,
            date,
            path,
            author,
            coverImage,
            excerpt,
            tags,
          },
        } = node

        return (
          <Post
            key={id}
            title={title}
            date={date}
            path={path}
            author={author}
            coverImage={coverImage}
            tags={tags}
            excerpt={excerpt || autoExcerpt}
          />
        )
      })}

      <Navigation
        previousPath={previousPagePath}
        previousLabel="Newer posts"
        nextPath={nextPagePath}
        nextLabel="Older posts"
      />
    </Layout>
  </>
)

Index.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
  }),
}

export const postsQuery = graphql`
  query Index($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//posts//" } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            date(formatString: "D MMMM YYYY")
            path
            author
            excerpt
            tags
            coverImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Index
