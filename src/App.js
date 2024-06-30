import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import ab from './about.png';
import os from './oily-skin.jpg';
import ds from './dry-skin.jpg';
import cs from './combination-skin.webp';
import ss from './sensitive- skin.jpeg';
import ns from './normal-skin.jpg';
import check from "./beauty.png";
import small from "./small.avif";
import axios from 'axios';
import last from './last.webp';
function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [startTransition, setStartTransition] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const [showForm, setShowForm] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);
  
    
    

    const [productName, setProductName] = useState('');
    const [productImg, setProductImg] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productHowToUse, setProductHowToUse] = useState('');
    const [productBuyLink, setProductBuyLink] = useState('');
    const [products, setProducts] = useState([]);
    const [showEnquiriesForm, setShowEnquiriesForm] = useState(false);
    const [enquiries, setEnquiries] = useState([]);

    const EnquiriesForm = ({ enquiries, onHide }) => {
      return (
        <div className="enquiries-form-popup">
          <h2>Enquiries</h2>
          <ul>
            {enquiries.map((enquiry, index) => (
              <li key={index}>
                <p>{enquiry.message}</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
          <button onClick={onHide}>Hide</button>
        </div>
      );
    };
    

    const handleShowEnquiries = async () => {
      // Fetch the latest enquiries data from the database
      const response = await fetch('https://skinsage-ljnh.onrender.com/enquiries'); // Replace with your actual API endpoint
      const data = await response.json();
      setEnquiries(data);
      
      // Show the enquiries form and hide the product form
      setShowProductForm(false);
      setShowEnquiriesForm(true);
    };
    
    const handleHideEnquiries = () => {
      setShowEnquiriesForm(false);
      setShowProductForm(true);
    };
  

    const handleOpenForm = () => {
      setShowForm(true);
    };
  
    const handleCloseForm = () => {
      setShowForm(false);
      setUsername('');
      setPassword('');
    };
  
    const handleSubmitForm = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('https://skinsage-ljnh.onrender.com/api/authenticate', {
          username,
          password
        });
  
     
        if (response.status === 200) {
          console.log('Authenticated successfully');
          setShowForm(false); // Close authentication form
          setShowProductForm(true); // Open product form
        } else {
          console.log('Authentication failed');
        }
      } catch (error) {
        console.error('Authentication error:', error);
      }
    };
  
    const handleAddProduct = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('https://skinsage-ljnh.onrender.com/api/products', {
          name: productName,
          img: productImg,
          description: productDescription,
          howToUse: productHowToUse,
          buyLink: productBuyLink
        });
  
        if (response.data.success) {
          console.log('Product added successfully');
          // Clear form fields after successful submission
          setProductName('');
          setProductImg('');
          setProductDescription('');
          setProductHowToUse('');
          setProductBuyLink('');
         // Implement this function to fetch products
        } else {
          console.log('Failed to add product');
        }
      } catch (error) {
        console.error('Error adding product:', error);
      }
    };


    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get('https://skinsage-ljnh.onrender.com/products');
          setProducts(response.data);
          console.log('Products fetched successfully:', response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, []);
    
    

  

  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('https://skinsage-ljnh.onrender.com/api/enquiries', {
          name,
          email,
          message,
        });
  
        if (response.data.success) {
          console.log('Enquiry submitted successfully');
          // Clear form fields after successful submission
          setName('');
          setEmail('');
          setMessage('');
        } else {
          console.log('Failed to submit enquiry');
        }
      } catch (error) {
        console.error('Error submitting enquiry:', error);
      }
    };
  
    











  
  const skinTypes = [
    {
      name: 'Oily Skin',
      image: os,
      description: 'Oily skin is characterized by an overproduction of sebum, leading to a shiny appearance and often enlarged pores.'
    },
    {
      name: 'Dry Skin',
      image: ds,
      description: 'Dry skin feels tight and may have a rough texture and flaky patches due to a lack of moisture and natural oils.'
    },
    {
      name: 'Combination Skin',
      image: cs,
      description: 'Combination skin has both oily and dry areas, typically with an oily T-zone and dry cheeks.'
    },
    {
      name: 'Sensitive Skin',
      image: ss,
      description: 'Sensitive skin is prone to redness, irritation, and reactions to various products and environmental factors.'
    },
    {
      name: 'Normal Skin',
      image: ns,
      description: 'Normal skin has a balanced level of moisture, with a smooth texture and few imperfections.'
    }
  ];
  

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowNavbar(true);
      setStartTransition(true);
    }, 200); // Delay of 0.2 seconds

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const handleHomeClick = () => {
    // Check if already on home page to prevent unnecessary state change and history push
    if (!showHome) {
      // Simulate navigating to the Home content
      setShowHome(true);
      // Push a state to the browser history stack
      window.history.pushState({ page: 'home' }, 'Home', '#home');
    }
  };
  

  
  
  const handleProductsClick = () => {
    
      setShowProducts(true);
      setShowHome(false);
      setShowContacts(false);
      window.history.pushState({ page: 'products' }, 'Products', '#products');
    
  };
  const handleContactsClick = () => {
    setShowHome(false);
    setShowProducts(false);
    setShowContacts(true);
    window.history.pushState({ page: 'contacts' }, 'Contacts', '#Contacts');
  };





  useEffect(() => {
    const handlePopstate = () => {
      const hash = window.location.hash;
      if (hash === '#home') {
        setShowHome(true);
        setShowProducts(false);
        setShowContacts(false);
      } else if (hash === '#products') {
        setShowHome(false);
        setShowProducts(true);
        setShowContacts(false);
      } else if (hash === '#Contacts') {
        setShowHome(false);
        setShowProducts(false);
        setShowContacts(true);
      }else {
        setShowHome(false);
        setShowProducts(false);
        setShowContacts(false);
      }
    };

    window.addEventListener('popstate', handlePopstate);

    handlePopstate();

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

 


  return (
    <div className="App">
      {showNavbar && (
        <div>
          <nav className="navbar">
            <a href="#" className='head'>𝖲𝗄𝗂𝗇𝖲𝖺𝗀𝖾</a>
            <a href="#home" onClick={handleHomeClick}>Home</a>
            <a href="#products" onClick={handleProductsClick}>Products</a>
            <a href="#Contacts"  onClick={handleContactsClick} >Contact</a>
          </nav>
        </div>
      )}


{!showHome && !showProducts && !showContacts && (
        <div className="background-div">
          <div className={`moving-image ${startTransition ? 'start' : ''}`}>
            <div className="text-on-image">𝖲𝗄𝗂𝗇𝖲𝖺𝗀𝖾</div>
          </div>
        </div>
      )}


      {showHome && (
      
      <div className="home-content">
          <div className="card" >
            <h1 className='home-head'>𝖲𝗄𝗂𝗇𝖲𝖺𝗀𝖾</h1>
            <p className='home-para'>
              SkinSage provides comprehensive product descriptions that detail each item's benefits, 
              ingredients, and targeted skincare concerns. Our site offers clear instructions on how to 
              use each product effectively, ensuring you achieve optimal results. With convenient buy 
              options, including secure online purchasing and delivery services, skincare enthusiasts can 
              easily access their favorite products from the comfort of home.
            </p>
          </div>


          <div className='about'>
      <img src={ab} alt="About Image" style={{height:"auto"}} />
      <div className="about-text">
      <h1 className='about-h'>WHAT ARE THE BASIC CATEGORIES OF SKIN CARE? </h1>
      <p>Skin care products are divided into different categories, depending on their function.  <br></br>

      Here are the five basic categories of skincare everyone must focus on.</p>
    <h1>CLEANSERS</h1>
      <p>The first step in every skincare routine is cleansing the skin. After all, neglecting to clean your skin could cause a lot of problems. 

There are several rules to keep in mind when using cleansers.<br></br> It includes: 
<br></br>
.Use a gentle cleanser with warm water <br></br>
.Avoid cleansing your skin more than twice every day<br></br>
.Veer away from using abrasive cleansing scrubs and other devices<br></br>
Ideally, people must gently apply their chosen cleansers in a circular 
        pattern using their fingers. This helps remove dirt and grime thoroughly without too much force. </p>
  <h1>EXFOLIATORS</h1>
  <p>
  These products aim to enhance the skin’s texture by stripping the dull layer to reveal a smoother and younger skin. <br></br>

  Using exfoliators also allow your skin to absorb other skincare products and cosmetics better. Just keep in mind to limit using these products to at least once or twice per week. </p>
      <h1>SERUMS </h1>
      <p>
  It is the best skincare product to apply after cleansing and before using moisturisers. Its primary purpose is to deliver nutrients to the skin to enhance its appearance. 

  It is ideal to purchase medical grade skincare products like serums from trusted brands like SkinGen. </p>
  <h1>MOISTURISERS WITH SPF</h1>
<h1>ANTI-AGEING PRODUCTS </h1>






      </div>
    
    </div>




    <div className="white-background"><br></br>
    <br></br>
            <h1>WHAT ARE THE DIFFERENT SKIN TYPES?</h1><br></br>
            <div className="skin-type-cards">
              {skinTypes.map((skinType, index) => (
                <div className="skin-type-card" key={index}>
                  <img src={skinType.image} alt={skinType.name} />
                  <h3>{skinType.name}</h3>
                  <p>{skinType.description}</p>
                </div>
               
              ))}
             
            </div>
          </div>
          



          <div className='nxtdiv'>
          <img src={check} alt="nxt div" className='image'/>
          <div className="about-text1">
          <h1 className='about-h'>HOW TO PICK SKIN CARE PRODUCTS ACCORDING TO SKIN TYPE </h1>
              <p>Several things to consider when choosing the right skin care product for the skin type include: <br></br><br></br>

Active Ingredients - It would be best to check the product labels first to prevent breakouts and other adverse reactions. 
It will help you determine if there are fragrances and other preservatives that can irritate the skin, especially those with sensitive skin.
<br></br><br></br>
Lifestyle - A person’s habits determine how their skin looks. 
People with active skin tend to be under the sun most of the time, putting them at risk for sun damage. <br></br><br></br>

Investing in skincare products with high levels of SPF could help take care of their complexion.<br></br><br></br>

Reviews - Always make it a habit to read customers’ reviews and feedback online to know how the products work. It will also help you determine how it works for your skin condition.  </p>

<button type='button' onClick={handleProductsClick}>Check our products</button>
          
          </div>

        



     

           <div id='contacts' style={{color:"white"}}><h1 style={{color:"white",textAlign:"center",fontSize:"100px"}}>𝖲𝗄𝗂𝗇𝖲𝖺𝗀𝖾</h1>
        
           
        <div >
           
           <div className="letter-form">
      <h2>Send Us a Letter</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name"> Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email"> Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit"className='button'>Send</button>
        <h1> Contact us</h1> 
           <p style={{color:"blue"}}>skinsage@gmail.com</p>
           <p style={{color:"blue"}}>+918987654321</p>
      </form>
    </div></div>
           <p style={{textAlign:"center",fontSize:"smaller"}}>SkinSage © 2024. All rights reserved</p>
          
          <br></br>
<br></br><br></br><br></br>           
           
           
           </div>
           </div>
         
        </div>
      )}
 
 
 
 {showProducts && (
  <div className="products">
    
    <div className="card1">
      <h1 className="home-head">𝖲𝗄𝗂𝗇𝖲𝖺𝗀𝖾</h1>
      <img src={small} alt="img of skincare" />
      <button className="adbutton" onClick={handleOpenForm}></button>

    </div>
     
    <div className="items">
    <h1 style={{ position:"absolute", display:"fixed",top:"10px",left:"10px",fontWeight:"bolder",fontSize:"60px",color:"white",fontFamily:"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Recommented Products</h1><br></br><br></br>

  {products.map((product, index) => (
    <div className="product-card" key={index}>
      <img src={product.img} alt={product.name} />
      <div className="product-details">
        <h3>{product.name}</h3>
        <button onClick={() => window.open(product.buyLink, '_blank')}>Buy Now</button>
        <div className="popup-content">
          <p className="description">{product.description}</p>
          <p><strong>How to Apply:</strong> {product.howToUse}</p>

        </div>
      </div>
    </div>
  ))}


</div>



<div className="new-section">
<div>
        <h1 style={{position:"absolute",right:"100px",color:"white",width:"600px",height:"400px"}}> What to Know About Your Skin Barrier and How to Protect It</h1>
        <p style={{position:"absolute",right:"100px",top:"200px",color:"white",width:"500px",height:"400px"}}>Your skin barrier protects your body from free radicals. 
          Harsh environments are often the cause of damage. Keep it protected using oils, ceramides, and more.</p>
          
      </div>
      <img src={last}></img>
      
    
    </div>
    <div className="footer">
  <p>&copy; 2024 SkinSage. All rights reserved.</p>
  <p>Follow us on:
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> |
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> |
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
  </p>
  <p>𝖲𝗄𝗂𝗇𝖲𝖺𝗀𝖾</p>
</div>

    {showForm && (
      <div className="form-popup">
        <form onSubmit={handleSubmitForm}>
          <h2>Authentication Form</h2>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div>
            <button type="submit">Authenticate</button>
            <button type="button" onClick={handleCloseForm}>
              Close
            </button>
          </div>
        </form>
      </div>
    )}
  </div>
)}

{showProductForm && (
  <div className="product-form-popup">
    <form onSubmit={handleAddProduct}>
      <h2>Add Product</h2>
      <label>
        Product Name:
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          value={productImg}
          onChange={(e) => setProductImg(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
        ></textarea>
      </label>
      <label>
        How to Use:
        <textarea
          value={productHowToUse}
          onChange={(e) => setProductHowToUse(e.target.value)}
          required
        ></textarea>
      </label>
      <label>
        Buy Link:
        <input
          type="text"
          value={productBuyLink}
          onChange={(e) => setProductBuyLink(e.target.value)}
          required
        />
      </label>
      <div>
        <button type="submit">Add Product</button>
        <button type="button" onClick={handleShowEnquiries}>Enquiries</button>   
             <button type="button" onClick={() => setShowProductForm(false)}>
          Close
        </button>
      </div>
    </form>

    <div>
   
   
      
      </div>
    
  </div>
  
)}


{showContacts&&(


<div id='Contacts' style={{ color:"white",backgroundColor:"black",top:"800px",height:"auto"}}><h1 style={{color:"white",textAlign:"center",fontSize:"100px"}}>𝖲𝗄𝗂𝗇𝖲𝖺𝗀𝖾</h1>
      
           
<div className="letter-form"style={{height:"400px"}}>

<form onSubmit={handleSubmit}>



<h1> Contact us</h1> 
<p style={{color:"blue"}}>skinsage@gmail.com</p>
<p style={{color:"blue"}}>+918987654321</p>
</form>
</div>
<br></br><br></br>
<p style={{textAlign:"center",fontSize:"smaller"}}>SkinSage © 2024. All rights reserved</p>

</div>
          





)}           
           
         

           </div>
          
         

    
  );
}

export default App;