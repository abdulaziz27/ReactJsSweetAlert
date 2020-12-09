 

import React from 'react'

 

class LifeCycle extends React.Component{

    constructor(props){

        super(props)

        this.state = {

            count : 20

        }

    }

    static getDerivedStateFromProps(props, state){

        console.log('getDerivedStateFromProps')

        return true;

 

    }

    componentDidMount(){

 

        setTimeout(() => {

            this.setState({

                count : this.state.count - 1

            })          

        }, 1000);   

        

        console.log('componentDidMount')

 

    }

    shouldComponentUpdate(nextProps, nextState){

        console.log('shouldComponentUpdate')
        console.log('nextState', nextState)

        if (nextState.count == 0) {
            return false;
        }

        return true;

 

    }

    getSnapshotBeforeUpdate(prevProps, PrevState){

        console.log('getSnapshotBeforeUpdate')

 

    }

    componentDidUpdate(prevProps, PrevState){

        setTimeout(() => {

            this.setState({

                count : this.state.count - 1

            })          

        }, 1000); 

        console.log('componentDidUpdate')

 

    }

    componentWillUnmount(){

        console.log('componentWillUnmount')

 

    }

 

    render(){

        console.log('render')

        return (

            <div>

                <h4 className="text-center bg-primary p-5">{this.state.count}</h4>

            </div>

        )

    }

}

export default LifeCycle