import React,{useState, useEffect} from 'react'
import {isEmpty, size} from 'lodash'
import {getColletion,deleteDocument} from './actions'


function App() {
const[pet, setPet]= useState({
  namePet:"",type:"",breed:"", dateBirth:"", nameOwner:"", phone:"", adress:"", email:""
})
const [pets, setPets]= useState([])
const [error, setError] = useState(null)

useEffect(() => {
  (async () => {
    const result = await getColletion("Pets")
    if (result.statusResponse) {
      setPets(result.data)
    }
    
  })() 
}, [])

const deletePet= async(id)=>{
  const result = await deleteDocument("Pets", id)
  if (!result.statusResponse){
    setError(result.error)
    return
  }
  const filteredTasks= pets.filter(pet=> pet.id !== id)
  setPets(filteredTasks)
}



//setPets([...pets, {id:result.data.it, name:pet}])
//setPet({namePet:"",type:"", breed:"",dateBirth:"",nameOwner:"",phone:"",adress:"",email:""})

 return (
  //Add Pet
  
  <div className="container mt-5">
    <head>VetStore</head>
    <hr/>
      <div className="row">
        <div className ="col-12"> 
        <h4 className="text-center">Lista de Mascotas</h4>

          {
            size(pets)===0 ?  ( 
              <h5>No hay Registros</h5>
            ) : (
              <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                      <tr>
                          <th>Mascota</th>
                          <th>Tipo</th>
                          <th>Raza</th>
                          <th>Fecha de Nacimiento</th>
                          <th>Nombre del Dueño</th>
                          <th>Telefono</th>
                          <th>Direccion</th>
                          <th>Email</th>
                          <th>Acciones</th>
                      </tr>
                  </thead>      
              <tbody> 
              {
                
                pets.map((pet)=>(

                  <tr key={pet.id}>
                  <td>{pet.namePet}</td>
                  <td >{pet.type}</td>
                  <td >{pet.breed}</td>
                  <td>{pet.dateBirth}</td>
                  <td >{pet.nameOwner}</td>
                  <td >{pet.phone}</td>
                  <td >{pet.adress}</td>
                  <td >{pet.email}</td> 
                  <td>
                  <button 
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={()=> deletePet(pet.id)}
                  >
                  Eliminar
                  </button>
                  <button 
                  className="btn btn-warning btn-sm float-right"
                  //onClick={()=> editPet(pet)}
                  >
                  Editar
                  </button>
                  </td>
                  </tr>              

                 
                
                ))

              }
              </tbody>
              </table>
              
              </div>
              
            )
          }
          
        </div>


      </div>
      
  </div>
  

  )
}

export default App
