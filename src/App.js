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
        <button onClick={() => console.log(this.state.articles)}>COnsole.log articles</button>
        {this.state.articles["data"] != undefined && <button onClick={() => this.setState({ trigger: true })}>Show Articles</button>}
        <div className="row">
          {this.state.trigger && this.state.articles["data"].map(item => {
            return <div className="col-3 mb-2">
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
        <div className=" card">
          <div className="bg-success card-header"><h4>{this.props.item.title}</h4></div>
          <div className="card-body">
            <p className="text-muted">{this.props.item.authors}</p>
            <p>{this.props.item.description}</p>
          </div>
          <div className="card-footer">
            <p>{this.props.item.slug}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
