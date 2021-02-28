import React,{useState, useEffect} from 'react'
import {isEmpty, size} from 'lodash'
import {getColletion,deleteDocument,addDocument,updateDocument} from './actions'
import {Button, Modal,Form}from 'react-bootstrap'


function App() {
const [pet, setPet]= useState({})
const [pets, setPets]= useState([])
const [error, setError] = useState(null)
const [editMode, setEditMode]= useState(false)
const [show, setShow] = useState(false)
const handleClose = () => setShow(false)
const handleShow = () => setShow(true)
const [show1, setShow1] = useState(false)
const handleClose1 = () => setShow1(false)
const handleShow1 = () => setShow1(true)
const [id, setId] = useState("")

useEffect(() => {
  (async () => {
    const result = await getColletion("Pets")
    if (result.statusResponse) {
      setPets(result.data)
    }
    
  })() 
}, [])

const validForm=()=>{
  let isValid = true
  setError(null)

  
  if(isEmpty(pet)){
    setError("Debes ingresar una Mascota")
    isValid= false
  }
  return isValid
}

const addPet= async(e)=>{
  e.preventDefault()
  if(!validForm()){
    return
  }

const result = await addDocument("Pets",{...pet})
if (!result.statusResponse){
  setError(result.error)
  return
}  
  setPets([...pets,{id:result.data.id, ...pet}])
  setPet({})
  handleClose()
}

const savePet= async(e)=>{
  e.preventDefault()
  
  if(!validForm()){
    return
  }

  const result = await updateDocument("Pets", id,{...pet})
  if (!result.statusResponse){
    setError (result.error)
    return
  }

  const editedPets= pets.map((item)=>item.id===id ?{id, ...pet} :item)
  setPets(editedPets)
  setEditMode(false)
  setPet({})
  setId("")
  handleClose()
}

const deletePet= async(id)=>{
  const result = await deleteDocument("Pets", id)
  if (!result.statusResponse){
    setError(result.error)
    return
  }
  const filteredPets= pets.filter(pet=> pet.id !== id)
  setPets(filteredPets)
  handleClose1()
}





const editPet=(thePet)=>{  
  setPet(thePet)
  setEditMode(true)
  setId(thePet.id)
  handleShow()
}

 return (
  //Add Pet
  
  <div className="container mt-5">
    <h1>VetStore</h1>
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
        <Form onSubmit={editMode ? savePet : addPet}>
         <Form.Group controlId="namePet">
            <Form.Label>Nombre de Mascota</Form.Label>                    
          <Form.Control type="text" placeholder="Ingrese el nombre de la mascota" value={pet.namePet} onChange={(text)=> setPet({...pet, namePet:text.target.value})}  />
         </Form.Group>
        <Form.Group controlId="type">
        <Form.Label>Tipo de Mascota</Form.Label>
          <Form.Control type="text" placeholder="Ingrese el tipo de Mascota" value={pet.type} onChange={(text)=> setPet({...pet, type:text.target.value})}/>
        </Form.Group>
        <Form.Group controlId="breed">
        <Form.Label>Raza de la Mascota</Form.Label>
          <Form.Control type="text" placeholder="Ingrese la raza de la mascota" value={pet.breed} onChange={(text)=> setPet({...pet, breed:text.target.value})} />
        </Form.Group>
        <Form.Group controlId="dateBirth">
        <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control type="date" placeholder="Ingrese la fecha de nacimiento" value={pet.dateBirth} onChange={(text)=> setPet({...pet, dateBirth:text.target.value})} />
          </Form.Group>
        <Form.Group controlId="nameOwner">
        <Form.Label>Nombre del Dueño</Form.Label>
          <Form.Control type="text" placeholder="Ingrese Nombre del Dueño" value={pet.nameOwner} onChange={(text)=> setPet({...pet, nameOwner:text.target.value})}/>
        </Form.Group>
        <Form.Group controlId="phone">
        <Form.Label>Telefono del Dueño</Form.Label>
          <Form.Control type="text" placeholder="Ingrese el telefono del Dueño" value={pet.phone} onChange={(text)=> setPet({...pet, phone:text.target.value})} />
        </Form.Group>
        <Form.Group controlId="adress">
        <Form.Label>Direccion</Form.Label>
          <Form.Control type="text" placeholder="Ingrese la direccion del Dueño" value={pet.adress} onChange={(text)=> setPet({...pet, adress:text.target.value})} />
        </Form.Group>
        <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Ingrese el correo del Dueño" value={pet.email} onChange={(text)=> setPet({...pet, email:text.target.value})} />
        </Form.Group>
        
        <Button variant="primary" type="submit" >
          { editMode ? "Guardar Cambios":"Guardar"}
          </Button>

          <Button className="btn  float-right" variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Form>

       

        </Modal.Body>
        <Modal.Footer>

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
                  <>
                  <Button 
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={handleShow1}
                  >
                  Eliminar
                  </Button>
                  <Modal show={show1} onHide={handleClose1}>
                  <Modal.Header closeButton>
                    <Modal.Title>Eliminar registro de Mascotas</Modal.Title>                    
                    </Modal.Header>
                    <Modal.Body>

                    <Button mg-2 variant="primary" type="submit" onClick={()=> deletePet(pet.id)}  >
                        Sí
                      </Button>

                      <Button className="btn  float-right"  variant="secondary"  onClick={handleClose1}>
                        No
                      </Button>


                    </Modal.Body>
                  </Modal>
                  </>
                  <button 
                  className="btn btn-warning btn-sm float-right"
                  onClick={()=> editPet(pet)}
                  
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
