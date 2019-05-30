import React,{Component} from 'react';




class ErrorBoundary extends Component{
    state = {
        error: false,
        errorText: '',
        additionalInfo: ''
    }

    componentDidCatch(error,info){
        console.log(`Catched ${error}  in  ${info}`)
        this.setState({
            error:true,
            errorText: error,
            additionalInfo: info
        })
    }

    render(){
        if (this.state.error) {
            // You can render any custom fallback UI
            return ( <div>
                        <h1> Ooops...coś się zepsuło </h1>
                        <div> {this.state.errorText}</div>
                        <div> {this.state.additionalInfo}</div>
                    </div>)
          }
          return (this.props.children);
    }
}


export default ErrorBoundary;