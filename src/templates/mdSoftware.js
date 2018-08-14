import React from 'react';
import Img from 'gatsby-image';
import SimpleNav from '../../plugins/gatsby-theme-bulma-layout/Simple/SimpleNav';

class mdSoftwareInsetPage extends React.Component {
  render() {
    const { html, frontmatter } = this.props.data.markdownRemark;
    var softwareTags = frontmatter.tags;

    return (
      <SimpleNav
        sitemetadata={this.props.data.site.siteMetadata}
        location={this.props.location}
      >
        <section className="section hero">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">{frontmatter.title}</h1>
              {logoImage(frontmatter)}
            </div>
          </div>
        </section>
        <section className="section">
          <div
            className="container content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </section>
        <section className="section">
          <div className="container content">
            <h3 className="specialties">SPECIALTIES</h3>
            <div className="tags">
              {softwareTags.map(tag => (
                <span className="tag is-medium" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container content">
            <h3 className="userSupport">USER SUPPORT</h3>
            <p>
              <a href={frontmatter.website}>Main Website</a>
            </p>
            <p>
              <a href={frontmatter.userForums}>User forums</a>
            </p>
            <p>
              <a href={frontmatter.userSupport}>Technical Support</a>
            </p>
            <p>
              <a href={frontmatter.tutorials}>Tutorials</a>
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container content">
            <h3 className="pricing">PRICING</h3>
            <table>
              <tbody>
                <tr>
                  <td>Student:</td>
                  <td>{frontmatter.studentPricing}</td>
                </tr>
                <tr>
                  <td>Professional:</td>
                  <td>{frontmatter.professionalPricing}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        {/* <section className="section">
          <div className="container content">
            <h3>PROJECTS</h3>
          </div>
        </section>
        <section className="section">
          <div className="container content">
            <h3>OTHER NOTES</h3>
          </div>
        </section> */}
      </SimpleNav>
    );
  }
}

export default mdSoftwareInsetPage;

const logoImage = frontmatter => {
  console.log(frontmatter);
  if (frontmatter.logo.name === 'placeholder') {
    return null;
  } else if (frontmatter.logo.childImageSharp) {
    return (
      <Img
        sizes={frontmatter.logo.childImageSharp.sizes}
        style={{ maxWidth: 600, maxHeight: 300 }}
      />
    );
  } else if (frontmatter.logo.publicURL) {
    return (
      <div className="image">
        <img
          src={frontmatter.logo.publicURL}
          style={{ maxWidth: 200, width: 200 }}
        />
      </div>
    );
  } else {
    return null;
  }
};

export const pageQuery = graphql`
  query markdownTemplateBySoftware($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        tags
        logo {
          name
          publicURL
          childImageSharp {
            sizes(maxWidth: 600) {
              ...GatsbyImageSharpSizes_tracedSVG
            }
          }
        }
        website
        userForums
        userSupport
        tutorials
        studentPricing
        professionalPricing
        description
        otherNotes
      }
    }
    site {
      siteMetadata {
        siteTitle
        siteDescr
        siteAuthor
        siteEmail
        siteTwitterUrl
        siteTwitterPretty
      }
    }
  }
`;
