import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,  Button,  Container,  Modal,  ModalHeader,  ModalBody,  FormGroup,  ModalFooter,} from "reactstrap";

const data = [
  { id: 1, nombre_usuario: "Diego Flores", cedula: 172104286,telefono: 2354624,mail: "ojosulds@gmail.com"},
  { id: 2, nombre_usuario: "Sebastian Andrade", cedula: 172104287,telefono: 2354623,mail: "ojosulds@gmail.com" },
  { id: 3, nombre_usuario: "Marlon Alpala", cedula: 172104288,telefono: 2354620,mail: "lds@gmail.com" },
  { id: 4, nombre_usuario: "Grace Estefania", cedula: 172104289,telefono: 2354629,mail: "s@gmail.com" },
  { id: 5, nombre_usuario: "Edward Elric", cedula: 172104280,telefono: 2354627,mail: "ds@gmail.com"},
  { id: 6, nombre_usuario: "Seto Kaiba", cedula: 172104285,telefono: 2354621 ,mail: "olds@gmail.com"},
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre_usuario: "",
      cedula: "",
      telefono:"",
      mail:"",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].nombre_usuario = dato.nombre_usuario;
        arreglo[contador].cedula = dato.cedula;
        arreglo[contador].telefono = dato.telefono;
        arreglo[contador].mail= dato.mail;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar Nuevo Cliente</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>nombre_usuario</th>
                <th>cedula</th>
                <th>telefono</th>
                <th>mail</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre_usuario}</td>
                  <td>{dato.cedula}</td>
                  <td>{dato.telefono}</td>
                  <td>{dato.mail}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                nombre_usuario: 
              </label>
              <input
                className="form-control"
                name="nombre_usuario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre_usuario}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                cedula: 
              </label>
              <input
                className="form-control"
                name="cedula"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.cedula}
              />
            </FormGroup>
            <FormGroup>
              <label>
                telefono: 
              </label>
              <input
                className="form-control"
                name="telefono"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.telefono}
              />
            </FormGroup>
          </ModalBody>
          <FormGroup>
              <label>
                mail: 
              </label>
              <input
                className="form-control"
                name="mail"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.mail}
              />
            </FormGroup>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar datos del Cliente</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                nombre : 
              </label>
              <input
                className="form-control"
                name="nombre_usuario"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                cedula: 
              </label>
              <input
                className="form-control"
                name="cedula"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                telefono: 
              </label>
              <input
                className="form-control"
                name="telefono"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                correo: 
              </label>
              <input
                className="form-control"
                name="correo"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>
          

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;

