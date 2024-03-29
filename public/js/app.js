console.log('client side javascrip file is loaded')



const weatherForm= document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'loading...'
    messageTwo.textContent =''

    fetch('/weather?address= '+ location).then((Response) =>{
    Response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }else{

            messageTwo.textContent = data.forecast,data.location
        
            }
        })
    })

})