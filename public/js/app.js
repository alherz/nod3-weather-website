const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    messageOne.textContent = 'Loading weather data'
    messageTwo.textContent = ''
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            //console.log(data);
            if(data.error){
                messageOne.textContent = 'Error:'
                messageTwo.textContent = data.error
                return
            }
            messageOne.textContent = 'Weather data: '
            messageTwo.textContent = `Location: ${data.location}\n\nForecast: ${data.forecast}`
            //console.log(data.address, data.forecast, data.location)
        })
    })
})