import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper/index';
import Base from '../core/Base';
import {getAllCategories, createProduct} from './helper/adminapicall';

const AddProduct = () => {

  const {user, token} = isAuthenticated();

    const[values, setValues] = useState({
        name : "",
        description : "",
        price : "",
        stock : "",
        photo : "",
        categories : [],
        category : "",
        loading : false,
        error : "",
        createdProduct : "",
        getRedirect : false,      //if true, then we'll redirect the user to the home page
        formData : ""             
      /* the form that we are using is not a HTML form, we need to prepare that into
      an object of form data, so that the info can be submitted to the backend */
      });

    const 
    {
      name, 
      description, 
      price, 
      stock,
      categories,
      category,
      loading,
      error,
      createdProduct,
      getRedirect,
      formData
    } = values;               //destructuring the data



  //creating a preload method, using the hook -> useEffect()
  //this will load all the stuff
  // const preload = () => {
  //   getAllCategories()
  //   .then(data => {
  //     console.log(data);
  //     if(data.error){
  //       setValues({...values, error : data.error});
  //     }else{
  //       setValues({...values, categories : data, formData : new FormData()});      //if everything went fine, then simply update the categories         
  //       console.log("CATE :", categories);
  //     }
  //   });
  // };

  const preload = () => {
    getAllCategories().then(data => {
      // console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };


  useEffect(() => {
    preload();
  }, []);

    const onSubmit = (event) => {  
      event.preventDefault();
      setValues({...values, error : "", loading : true});
      createProduct(user._id, token, formData)
      .then(data => {
        if(data.error){
          setValues({...values, error : data.error})
        }else{
          setValues({
            ...values, 
            //will be empting out some values
            name : "", 
            description : "", 
            price : "",
            photo : "",
            stock : "",
            loading : false,
            createdProduct :  data.name       //using this to display, that the product was created
          })
        }
      })
    };

    const handleChange = name => event => {
         const value = name === "photo" ? event.target.files[0] : event.target.value;
         /* if we got photo, then get us the filepath, else get us the value */
         formData.set(name, value);       //setting the fom with its name and value, to pass it to the backend
         setValues({...values, [name] : value});
         /* first, Load all the values, and then depended upon the name of the object, provide it a value */
    };

    const successMessage = () => (
      <div className="alert alert-success mt-3"
      style = {{display : createdProduct ? "" : "none"}}
      >
        <h4>{createdProduct} Created Successfully</h4>
      </div>
    );

    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
           
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
           
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
         
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
            <option>Select</option>
            {categories &&
              categories?.map((cate, index) => (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              ))}
            </select>
          </div>
         
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
            Create Product
          </button>
        </form>
      );

    return(
        <Base title = "Add a Product" description = "Welcome to create product" className = "container bg-info p-4">
            <Link to="/admin/dashboard" className = "btn btn-md btn-dark mb-3 mt-3  ">
            Admin Home
            </Link>

            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">                      {/* Here offset-md-2 shift the md(medium) 2 cols to the right */}
                {successMessage()}    
                {createProductForm()}
                </div>
            </div>
        </Base>
    );
};


export default AddProduct;