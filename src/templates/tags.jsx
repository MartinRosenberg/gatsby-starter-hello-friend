import '../styles/layout.css'

import { graphql } from 'gatsby'
import * as PropTypes from 'prop-types'
import React from 'react'

import Layout from '../components/Layout'
import Navigation from '../components/Navigation'
import Post from '../components/Post'
import Seo from '../components/Seo'

const Tags = ({
  data: { allMarkdownRemark: { edges: posts } },
  pageContext: { nextPagePath, previousPagePath, tag },
}) => (
  <>
    <Seo />
    <Layout>
      <div className="infoBanner">
        Posts with tag: <span>#{tag}</span>
      </div>

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
            tags={tags}
            coverImage={coverImage}
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

Tags.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
    tag: PropTypes.string,
  }),
}

export const postsQuery = graphql`
  query Tags($limit: Int!, $skip: Int!, $tag: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
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

export default Tags
