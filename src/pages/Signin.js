import React from 'react'
import '../../src/App.css'

const Signin = () => {
  return (
    <div>
      <p>

      "Welcome to our Agricultural Commodity Price Projection!
      Step into the future of farming with us as we unveil our 
      latest forecasts for the upcoming harvest season. Discover
      the anticipated prices of staple crops like wheat, corn,
      and soybeans, and gain valuable insights into market trends
      and fluctuations. Whether you're a farmer, trader, or enthusiast,
      our projections will guide you towards informed decisions 
      and successful ventures in the agricultural industry. 
      Join us on this exciting journey of growth and prosperity in
       agriculture!"

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
    <h7 className="createAcc"> dont have an account ?</h7>
  </div>
  

  </div>
</div>




  )
}

export default Signin
