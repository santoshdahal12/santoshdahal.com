import React, { Fragment } from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

import Layout from "../components/layout"
import SEO from "../components/seo"
import './index.css'

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <Layout type={Layout.Type.MAIN_PAGE}>
      <SEO title="Software blog" />
      <div style={{
        marginBottom: `2rem`, display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: "justify"
      }}>
        <p>
         Hi !! You have landed here finally, welcome !! Hopefully there is something nice here you can read.
         I wish I could get time to write more .
        </p>
      </div>
      {
        edges.map(
          edge => {
            const { frontmatter, timeToRead } = edge.node;
            const { featuredImgAlt, featuredImage, featuredImgSrc, excerpt } = frontmatter;
            const featuredImgFluid = featuredImage.childImageSharp.gatsbyImageData;
            return (
              <div
                key={frontmatter.path} className="card">
                <Fragment>
                  <Link to={frontmatter.path} className="subnav_link">
                    <h2 style={{ marginBottom: 0 }}>{frontmatter.title}</h2>
                  </Link>
                  <div className="blog-runner">
                    <small>{frontmatter.date}&nbsp;.&nbsp;{timeToRead} min read</small>
                  </div>
                  <GatsbyImage image={featuredImgFluid} alt={featuredImgAlt} />
                  <p className="featured-image-runner" dangerouslySetInnerHTML={{ __html: featuredImgSrc }} />
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div>
                      {excerpt}
                    </div>
                    <div>
                      <Link to={frontmatter.path} >
                        Read more
                      </Link>
                    </div>

                  </div>

                </Fragment>
              </div>
            );
          }
        )
      }
    </Layout >
  );
}

export const query = graphql`query MyQuery {
  allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
    edges {
      node {
        timeToRead
        frontmatter {
          excerpt
          title
          path
          date(formatString: "MMMM Do, YYYY")
          tags
          featuredImage {
            childImageSharp {
              gatsbyImageData(width: 400, layout: CONSTRAINED)
            }
          }
          featuredImgAlt
          featuredImgSrc
        }
      }
    }
  }
}`

export default IndexPage
