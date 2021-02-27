import React,{useState, useEffect} from 'react'
import {isEmpty, size} from 'lodash'
import {getColletion,deleteDocument} from './actions'
import {Button, Modal, ModalHeader, ModalBody,Form}from 'react-bootstrap'
import {Input}from 'react-bootstrap'


function App() {
const[pet, setPet]= useState({
  namePet:"",type:"",breed:"", dateBirth:"", nameOwner:"", phone:"", adress:"", email:""
})
const [pets, setPets]= useState([])
const [error, setError] = useState(null)

const [show, setShow] = useState(false)
const handleClose = () => setShow(false)
const handleShow = () => setShow(true)

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
      <div div className ="col-6">
        Listado de Mascotas
      </div>
      <div className="col-6">
      <>
      <Button variant="primary" onClick={handleShow}>
        Crear Registro
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registro de Mascotas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group controlId="namePet">
        <Form.Label>Nombre de Mascota</Form.Label>
          <Form.Control type="text" placeholder="Ingrese el nombre de la mascota" />
        </Form.Group>
        <Form.Group controlId="type">
        <Form.Label>Tipo de Mascota</Form.Label>
          <Form.Control type="text" placeholder="Ingrese el tipo de Mascota" />
        </Form.Group>
        <Form.Group controlId="breed">
        <Form.Label>Raza de la Mascota</Form.Label>
          <Form.Control type="text" placeholder="Ingrese la raza de la mascota" />
        </Form.Group>
        <Form.Group controlId="dateBirth">
        <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control type="date" placeholder="Ingrese la fecha de nacimiento" />
        </Form.Group>
        <Form.Group controlId="nameOwner">
        <Form.Label>Nombre del Dueño</Form.Label>
          <Form.Control type="text" placeholder="Ingrese Nombre del Dueño" />
        </Form.Group>
        <Form.Group controlId="phone">
        <Form.Label>Telefono del Dueño</Form.Label>
          <Form.Control type="text" placeholder="Ingrese el telefono del Dueño" />
        </Form.Group>
        <Form.Group controlId="adress">
        <Form.Label>Direccion</Form.Label>
          <Form.Control type="text" placeholder="Ingrese la direccion del Dueño" />
        </Form.Group>
        <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Ingrese el correo del Dueño" />
        </Form.Group>

        </Form>
        

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      </>

      </div>
    </div>
    <div className="row">
        <div className ="col-12">      
       
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
