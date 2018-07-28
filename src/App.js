import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    articles: [1],
    test: [1, 2, 3],
    trigger: false,
  }

  componentDidMount() {
    this.makeapicall()
  }

  makeapicall() {
    fetch("https://publist.ai/api/v2/jobs.frontend", {
      body: "{\"query\": \"tech\"}",
      headers: {
        Authorization: "Bearer {{your.api.token}}",
        "Content-Type": "application/json"
      },
      method: "POST"
    })
      .then(res => res.json())
      .then(data =>
        this.setState({
          articles: data
        }))
      .catch("There was an error w/ makeapicall()")
  }

  render() {
    return (
      <div className="App container">
        <div className="p-3">
          <h1>Publist.ai Frontend Coding Challenge</h1>
          <p>Hello! Thank you for taking the time to review my code submission. In the two hour window I designed a simple front-end using React and Bootstrap4 to fetch the news articles and display them for the user.</p>
          <p>If I had more time, what I would like to do is have each card be initially show the slug, and if you click on the header the card would expand to see the full article. That way users would be able to see a higher volume of articles and only be shown deeper information for the news that catches their eye.</p>
          <p>Jonathan Yee, Front End Engineer</p>

          {this.state.articles["data"] != undefined && <button className="btn btn-secondary" onClick={() => this.setState({ trigger: true })}>Click Here To Show Articles</button>}
        </div>
        <div className="row">
          {this.state.trigger && this.state.articles["data"].map(item => {
            return <div className="col-12 mb-5">
              <News
                item={item}
              />
            </div>
          })}
        </div>
      </div>
    );
  }
}

class News extends Component {
  render() {
    return (
      <div>
        <div className="card">
          <div className="bg-info card-header text-center"><h5>{this.props.item.title}</h5></div>
          <div className="card-body">
            {this.props.item.authors && <p className="text-muted"> By: {this.props.item.authors}</p>}
            {this.props.item.description && <p>{this.props.item.description}</p>}
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
              <div className="btn-group mr-2" role="group" aria-label="Second group">
                <button className="btn btn-outline-info">See More</button>
              </div>
              <div className="btn-group mr-2" role="group" aria-label="Second group">
                <button className="btn btn-outline-info">Share</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
