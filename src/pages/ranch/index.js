import * as React from "react";

import Layout from "../../components/Layout";
import RanchRoll from "../../components/RanchRoll";

export default class RanchIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/agatedmess320.jpg')`,
          }}
        >
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <RanchRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
