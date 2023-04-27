import React from "react";
import { Grid, Container } from "semantic-ui-react";
import "./style.css"

const UsersEngagement = () => {
  return (
    <div className="userimformation-outer">
      <Container id="counter" className="m-40">
        <Grid>
          <Grid.Row columns={5}>
            <Grid.Column className="user-counter">
              <h2>Users</h2>
              <p>Engagement</p>
            </Grid.Column>
            <Grid.Column>
              <div className="user">
                <p>Active</p>
                <h3>95k+</h3>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="homeclips">
                <p>Clips</p>
                <h3>850k+</h3>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="post">
                <p>Posts</p>
                <h3>900k+</h3>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="product">
                <p>Products</p>
                <h3>20k+</h3>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>


    </div>
  )
}

export default UsersEngagement;