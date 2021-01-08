import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

export default class DishDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderDish(dish) {
    if (dish != null)
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    else return <div></div>;
  }

  renderComments(comments) {
    if (comments != null) {
      const c = comments.map((comment) => {
        const monthNames = [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ];
        let date = new Date(comment.date);
        let dateString =
          monthNames[date.getMonth()] +
          " " +
          date.getDate() +
          ", " +
          date.getFullYear();
        return (
          <div>
            <p>{comment.comment}</p>
            <p>
              -- {comment.author}, {dateString}
            </p>
          </div>
        );
      });
      return <div>{c}</div>;
    } else return <div></div>;
  }

  render() {
    let props = this.props;
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(props.selectedDish)}
        </div>
        {console.log("props:", props)}
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          {this.renderComments(props.selectedDish.comments)}
        </div>
      </div>
    );
  }
}
