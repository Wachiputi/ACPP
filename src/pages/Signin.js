import React from 'react'
import '../../src/App.css'

const Signin = () => {
  return (
    <div>
      <p>

      ompiling...
One of your dependencies, babel-preset-react-app, is importing the    
"@babel/plugin-proposal-private-property-in-object" package without   
declaring it in its dependencies. This is currently working because   
"@babel/plugin-proposal-private-property-in-object" is already in your
node_modules folder for unrelated reasons, but it may break at any time.

babel-preset-react-app is part of the create-react-app project, which
is not maintianed anymore. It is thus unlikely that this bug will
Failed to compile.

      </p>

      <div className="container-lg">
  <div className="card p-4"> 
    <h2 className="text-center mb-4">Login</h2> 
    <div className="mb-3"> 
      <label htmlFor="inputEmail" className="form-label">Email address</label>
      <input type="email" className="form-control" id="inputEmail" placeholder="name@example.com" />
    </div>
    <div className="mb-3"> 
      <label htmlFor="inputPassword" className="form-label">Password</label>
      <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
    </div>
    <div className="text-center"> 
      <button type="button" className="btn btn-primary px-4">Sign In</button>
    </div>
    <h3 className="createAcc"> dont have an account ?</h3>
  </div>
  

  </div>
</div>




  )
}

export default Signin
