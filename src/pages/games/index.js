import * as React from "react";

import Layout from "../../components/Layout";
import GamesRoll from "../../components/GamesRoll";

export default class GamesIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/gamepic.png')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: "0.5rem 0 0 #f40, -0.5rem 0 0 #f40",
              backgroundColor: "#f40",
              color: "white",
              padding: "1rem",
            }}
          >
            My Games
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <GamesRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}