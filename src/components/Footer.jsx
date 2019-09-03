import * as PropTypes from 'prop-types'
import React from 'react'

const Footer = ({ copyright }) => (
  <footer>
    {copyright ? (
      <div
        dangerouslySetInnerHTML={{
          __html: copyright,
        }}
      />
    ) : (
      <>
        <span className="footerCopyright">
          © 2019 Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
        </span>
        <span className="footerCopyright">
          Starter created by <a href="https://radoslawkoziel.pl">panr</a>
        </span>
      </>
    )}
  </footer>
)

Footer.propTypes = {
  copyright: PropTypes.string,
}

export default Footer
