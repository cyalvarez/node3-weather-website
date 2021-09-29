console.log('Holaaaa')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

/*fetch('http://localhost:3000/weather?address=Philadelphia').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.location)
            console.log(data.location)
        }
    })
})*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#p1')
const m2 = document.querySelector('#p2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                m1.textContent=data.error
            } else {
                m1.textContent=data.location
                m2.textContent=data.forecast
            }
        })
    })

})