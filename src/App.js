import React from "react";
import "./styles.css";
import { Loader, Modal } from "rsuite";
import AnimeCard from "./Components/AnimeCard/AnimeCard";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      modalOpen: false,
      modalData: null
    };
    this.loadData = this.loadData.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.loadData();
  }

  loadData() {
    fetch("https://ghibliapi.herokuapp.com/films")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data: data });
        //console.log(data);
      })
      .catch((err) => console.log("Error while getting the data!"));
  }

  handleModalOpen(id) {
    this.setState({ modalOpen: true });

    // mainData already has all the details
    //BUT as asked fetching the particular data using ID
    fetch(`https://ghibliapi.herokuapp.com/films/${id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ modalData: data });
        console.log(data);
      });
  }
  handleModalClose() {
    this.setState({ modalOpen: false, modalData: null });
  }

  render() {
    return (
      <div className="App">
        <h3 className="Header">Welcome to Anime Catalogue</h3>
        <br />
        <div className="mainContainer">
          {this.state.data === null ? (
            <Loader size="lg" />
          ) : (
            <div className="CardsContainer">
              {this.state.data.map((item) => {
                return (
                  <AnimeCard
                    item={item}
                    handleModalOpen={this.handleModalOpen}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Modal approach to Show more Details of the clicked Anime */}
        {/* another approach could be usign react-router */}

        <Modal full open={this.state.modalOpen} onClose={this.handleModalClose}>
          <Modal.Header>
            <Modal.Title>More Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.modalData === null ? (
              <div className="loader">
                <Loader size="lg" />
              </div>
            ) : (
              <div className="moreDetails">
                <img
                  className="modalImage"
                  src={this.state.modalData.image}
                  width="250px"
                />
                <br />
                <div className="titles">
                  <p>{this.state.modalData.title}</p>
                  <p>{this.state.modalData.original_title}</p>

                  <p>{this.state.modalData.original_title_romanised}</p>
                </div>
                <p>{this.state.modalData.description}</p>
                <br />
                <img
                  src={this.state.modalData.movie_banner}
                  width="200px"
                  className="modalImage"
                  width="85%"
                />
                <br />
                <p>Released in {this.state.modalData.release_date}</p>
                <p>{this.state.modalData.rt_score}</p>
                <p>
                  Directed by : <b>{this.state.modalData.director}</b>
                </p>
                <p>
                  Produced by : <b>{this.state.modalData.producer}</b>
                </p>

                <p>
                  Link to watch :{" "}
                  <a href={this.state.modalData.url} target="#">
                    Link
                  </a>{" "}
                </p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}
