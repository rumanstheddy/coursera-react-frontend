import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

export default class DishDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderDish(dish) {
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  renderComments(comments) {
    const c = comments.map((comment) => {
      return (
        <div>
          <p>{comment.comment}</p>
          <p>
            -- {comment.author},{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}
          </p>
        </div>
      );
    });
    return <div>{c}</div>;
  }

  render() {
    let props = this.props;
    return props.dish != null ? (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {console.log("props:", props)}
          {this.renderDish(props.dish)}
        </div>
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          {this.renderComments(props.dish.comments)}
        </div>
      </div>
    ) : (
      <div></div>
    );
  }
}
