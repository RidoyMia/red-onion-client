import React from 'react';

const Footer = () => {
    return (
        <div className='mt-16 bg-black text-white'>
            <footer className="footer p-10 py-16 bg-black text-white">
  <nav>
    <header className="footer-title">Services</header> 
    <a className="link link-hover">Dinner</a>
    <a className="link link-hover">Breakfase</a>
    <a className="link link-hover">Launch</a>
    <a className="link link-hover">Blog</a>
  </nav> 
  <nav>
    <header className="footer-title">Company</header> 
    <a className="link link-hover">Home</a>
    <a className="link link-hover">Cart</a>
    <a className="link link-hover">Order</a>
  
  </nav> 
  <nav>
    <header className="footer-title">Legal</header> 
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav> 
  <form>
    <header className="footer-title">Newsletter</header> 
    <fieldset className="form-control w-80">
      <label className="label">
        <span className="label-text">Enter your email address</span>
      </label> 
      <div className="join">
        <input type="text" placeholder="username@site.com" className="input input-bordered join-item" /> 
        <button className="btn btn-primary join-item">Subscribe</button>
      </div>
    </fieldset>
  </form>
</footer>
        </div>
    );
};

export default Footer;