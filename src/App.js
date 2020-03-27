import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{

 state = {
   name:"",
   category:"",
   area:0,
   income:0,
   tag:"",
   info:[],
   sortedtag:"",
   summary:"",
   result:[]
 }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleTag = (event) => {
    this.setState({sortedtag: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {name,category,area,income,tag,info} = this.state
    this.setState({
      info: [...info,{
        name:name,
        category:category,
        area: area,
        income:income,
        tag: tag
      }],
      name:"",
      category:"",
      area:0,
      income:0,
      tag:""
    })
  }

  sortByTag = (event) => {
    event.preventDefault();
    let totalIncome = 0;
    let averagesqft = 0;
    console.log(this.state)

    const result =  this.state.info.map((el) => {
      if(this.state.sortedtag.toLowerCase() === el.tag.toLowerCase()){
        totalIncome += parseInt(el.income);
        averagesqft+=parseInt(el.area);
        return el.name
      }
    })
    console.log(result);
    const sortedElement = result.map((el)=>{
      if(el){
        return el
      }
    })
    let summary = `For given label ${this.state.sortedtag} total income is ${totalIncome} with ${averagesqft} squareft of area.`
    this.setState({
      result: sortedElement
    })
    this.setState({summary: summary})
    console.log(result)

  }

  render(){
    console.log(this.state)
    return(
      <div>
        <form onSubmit={this.handleSubmit} className = "form1">
          <label>
             Name:
             <input type="text" value ={this.state.name} onChange= {this.handleChange} name="name" placeholder = "Enter Name"/>
          </label>
          <label>
             Category:
             <input type="text" value ={this.state.category} onChange= {this.handleChange} name="category" placeholder = "Enter Category"/>
          </label>
          <label>
             Area:
             <input type="text" value ={this.state.area} onChange= {this.handleChange} name="area" placeholder = "Enter Area"/>
          </label>
          <label>
             Income:
             <input type="text" value ={this.state.income} onChange= {this.handleChange} name="income" placeholder = "Enter Income"/>
          </label>
          <label>
             Tag:
             <input type="text" value ={this.state.tag} onChange= {this.handleChange} name="tag" placeholder = "Enter Tag"/>
          </label>

          <input type="submit" value="Submit" />
        </form>

        <form onSubmit={this.sortByTag} className = "form2">
          <label>
            Sort By Tag:
            <input type="text" onChange= {this.handleTag}  value ={this.state.sortedtag} placeholder = "Enter Tag For Sorting"/>
          </label>
          <input type="submit" value="Submit" />

        </form>
        {this.state.result.map( el=> <p>{el}</p>)}
        <p>{this.state.summary}</p>
      </div>
    )
  }
}

export default App;
