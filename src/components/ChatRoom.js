import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField'; 
import Button from '@material-ui/core/Button'; 

class ChatRoom extends Component{
    constructor(){
        super();
        this.state = {
            message:'',
            messages:[]
        }
    }

    updateMessage =(e)=>{
        this.setState({message: e.target.value});
    }

    componentDidMount(){
        window.firebase.database().ref('messages/').on('value', snap =>{
            const currentMessages= snap.val();
            if (currentMessages) {
                this.setState({
                    messages:currentMessages
                });                
            }
        });
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        const newMessage = {
            id: this.state.messages.length,
            text: this.state.message
        };

        window.firebase.database().ref(`messages/${newMessage.id}`).set({
            id:newMessage.id,
            text:newMessage.text
        });

        this.setState({message:''})
    }

    render(){
        const {messages} = this.state;
        const  messagesList = messages.map(message=>{
                return <li key={message.id}>{message.text}</li>
            });
        return(
            <div className=''>
                <ul>
                    {messagesList}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <TextField type='text' value={this.state.message} onChange={this.updateMessage}/>
                    <Button>Send </Button>
                </form>
            </div>
        )
    }
}

export default ChatRoom;