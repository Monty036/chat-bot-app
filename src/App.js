import ChatBot from 'react-simple-chatbot';
var name;
var to;
var date;
var numberOfPeople;
var ctr=0;
function App() {
  

  const fetching =() => {
    // Fetch request logic here
    if(ctr===0){
      fetch('https://chat-bot-api-aman.onrender.com/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          to: to,
          date:date,
          numberOfPeople:numberOfPeople
        }),
      })
        .then(response => response.json())
        .then(data => console.log('Fetch response:', data))
        .catch(error => console.error('Error during fetch:', error));
      ctr++;
    }
    
    return 'End';
  }

  const steps = [
    {
      id: "Greet",
      message: 'Welcome to the website, please make your table reservation',
      trigger: 'Ask name'
    },
    {
      id: 'Ask name',
      message: 'Please enter your name',
      trigger: 'Get name'
    },
    {
      id: 'Get name',
      user: true,
      validator:(value)=>{
        console.log(value);
        name=value;
        return true;
      },
      trigger: 'Ask phone'
    },
    
    {
      id: 'Ask phone',
      message: 'Great! {previousValue} Now, please enter your phone number',
      trigger: 'Get phone'
    },
    {
      id: 'Get phone',
      user:true,
      validator:(value)=>{
        console.log(value);
        to=value;
        if (isNaN(value)) {
          return 'value must be a number';
        } else if (value.length !== 10) {
          return 'Invalid phone number';
        } 
        return true;
      },
      trigger: 'Ask date'
    },
    {
      id: 'Ask date',
      message: 'Great! Now, please enter your preferred date',
      trigger: 'Get date'
    },
    {
      id: 'Get date',
      user:true,
      validator:(value)=>{
        console.log(value);
        date=value;
        return true;
      },
      trigger: 'Ask people'
    },
    {
      id: 'Ask people',
      message: 'Great! Now, please enter number of people to dine',
      trigger: 'Get people'
    },
    {
      id: 'Get people',
      user:true,
      validator:(value)=>{
        console.log(value);
        numberOfPeople=value;
        if (isNaN(value)) {
          return 'value must be a number';
        } else if (value < 0) {
          return 'value must be positive';
        } else if (value > 20) {
          return `Sorry, maximum capacity is 20`;
        }
        return true;
      },
      trigger: 'Send request'
    },
    
    {
      id: 'Send request',
      message: 'Sending data...',
      trigger: fetching
    },
    {
      id: 'End',
      message: 'Thank you for booking the table!',
      end: true
    }
  ];

  return (
    <>
     
        <ChatBot steps={steps} />
      
    </>
  );
}

export default App;