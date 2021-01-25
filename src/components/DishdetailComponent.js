import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  FormFeedback,
  Form,
  Label,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: "false",
      rating: "",
      name: "",
      comment: "",
      touched: {
        name: false,
        comment: false,
      },
    };
  }

  handleSubmit = (event) => {
    let values = this.state;
    console.log("Current State is: " + JSON.stringify(this.state));
    // event.preventDefault();
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "select" ? target.textContent : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  validate = (name) => {
    const errors = {
      name: "",
    };

    if (this.state.touched.name && name.length < 3)
      errors.name = "First Name should be >= 3 characters";
    else if (this.state.touched.name && name.length > 10)
      errors.name = "First Name should be <= 10 characters";

    return errors;
  };

  render() {
    const errors = this.validate(this.state.name);
    return (
      <div>
        <Button color="secondary" onClick={this.toggleModal}>
          <span className="fa fa-pencil"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            {" "}
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label for="rating">Rating</Label>
                <Input
                  type="select"
                  name="rating"
                  id="rating"
                  onChange={this.handleInputChange}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="nameField">Your Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="nameField"
                  value={this.state.name}
                  valid={errors.name === ""}
                  invalid={errors.name !== ""}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur("name")}
                  placeholder="Your Name"
                />
                <FormFeedback>{errors.name}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="commentArea">Comment</Label>
                <Input
                  type="textarea"
                  name="comment"
                  id="commentArea"
                  value={this.state.comment}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur("comment")}
                />
              </FormGroup>
              <Button
                type="submit"
                value="submit"
                color="primary"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderDish({ dish }) {
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

function RenderComments({ comments, addComment, dishId }) {
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
  return (
    <div>
      {c}
      <CommentForm dishId={dishId} addComment={addComment} />
    </div>
  );
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
};

export default DishDetail;
