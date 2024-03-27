const express = require('express');
const bodyParser = require('body-parser');
const cors  = require('cors');
const router = express.Router();
const { Pool } = require('pg');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secretKey = 'testsecret'
console.log(secretKey);
// const authMiddleware = require('./authMiddleware');


const app = express();
const PORT = process.env.PORT || 3000;

const multer = require('multer');
const path = require('path');


//Setting Storage Engine

   const storage = multer.diskStorage(
    {
        destination: function(req, file,cb)
        {
            cb(null, 'uploads/');
        },

        filename: function(req,file,cb)
        {
            cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }
   );

   //Initialize multer

   const upload = multer(
    {
         storage: storage
    }
   );
  
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ONLINESHOPAPP',
    password:'Abhijith@11',
    port:5432,

});

pool.connect().then(()=>{
    console.log('Connected to postgreSQL!!!');
})
.catch((err)=> {
    console.log('Error connecting to PostGreSQL!!!');
});


// app.listen(PORT, ()=> {
//   console.log(`Server running on port ${PORT}`);
// });


// app.get('/api/products',async(req,res)=> {

//      try {
//         const result = await pool.query('SELECT * FROM product')
//         const products = result.rows;
//         res.json(products);
//      } catch(error)
//      {
//             console.error('Error fetching products:',error);
//             res.status(500).json({error:'Internal server Error'});
//      }

// }); 

// router.post('/', async(req,res)=> {
//     const {userid,username,password} = req.body;

//     try
//     {
//         await pool.query('INSERT INTO user(userid,username,password), VALUES ($user_id,$user_name,$password)',[userid,username,password]);
//         res.status(201).send();
//     } 
   
//     catch(error) {
//         console.log('Error registering user:',error);
//         res.status(500).json({error: 'Internal Server Error'});
//     }

// });


//API End Point to add Products

app.post('/products',async(req,res)=> {

    const {name,price,description} = req.body;
    const sellerId = req.userId;


    //Check if user is a seller

    const userResult = await pool.query('SELECT * FROM users WHERE user_id = $1 AND role = $2', [userId, 'seller']);
    if(userResult.rows.length === 0)
    {
        return res.status(403).json({message: 'Only admins are allowed to add products'});
    }

    try
    {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO products (name,price,description) VALUES ($1,$2,$3)', [name,price,description]);
        client.release();
        res.status(201).json({message: "Product added succesffully"});
    }
      catch(err)
      {
        console.error('Error adding product:',err);
        res.status(500).json({message:'Failed to add product'});
      }
});

app.post('/register',(req,res)=>{
    const {username,email,password} = req.body;

    //Insert user data into the database
    pool.query('INSERT INTO users (username,email,password) VALUES ($1,$2,$3)',[username,email,password],(err,result)=> {
        if(err) {
            console.error('Error inserting user:',err);
            res.status(500).json({message:'Error registering user'});
        }

        else
        {
            console.log('User registered successfully');
            res.status(200).json({message: 'User registered successfully'})
        }
    });
});

//API End point to get users

app.get('/users',async(req,res)=> {

     pool.query('SELECT * FROM users',(err,result)=> {
         if(err)
         {
            console.error('Error getting users:',err);
            res.status(500).json({message:'Error getting users'});
         }
         else 
         {
            const users = result.rows;
            res.status(200).json(users);
         }
    })
    
});


app.post('/login',(req,res)=> {
    const {email,password} = req.body;
    console.log('login - email:', email);
    pool.query('SELECT * FROM users WHERE email=$1 AND password=$2',[email,password],(err,result)=> {
        if(err) {
            console.error('Error checking user:',err);
            res.status(500).json({message:'Error checking user'});
        } else 
        {
           
            if(result.rows.length > 0){
                   //User exist, login successful
                   const user = result.rows[0];
                   const token = jwt.sign({ userId:user.user_id }, secretKey);
                   res.status(200).json({message:"Login successful",user:{email:user.email, username:user.username},token:token, userId:user.user_id});
            }  else 
            {
                res.status(401).json({message:'Invalid email or password'});
            }
        }
    });


    //   if(email === 'admin@gmail.com' && password === 'adminpassword')
    //   {
    //      const token = jwt.sign({userId:})
    //   }
});



//API End point to ADD products (ADMIN)


//API End point to Fetch Products
app.get('/api/product', async (req,res) => {
    // res.status(200).json({message: 'User registered successfully'})

   try
   {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM product');
        res.json(result.rows);
        client.release();
   } 
   
   catch(error) {
     console.error('Error fetching products:',error);
     client.release();
     res.status(500).send('Error fetching products');
   }

   
});

//API End point to Fetch Products based on product id


app.get('/api/product/:id', async(req,res)=> {
   
     const productId = req.params.id;

     try {

        const client = await pool.connect();
        const result = await client.query( 'SELECT * FROM product WHERE product_id = $1',[productId]);
        client.release();
              
        if (result.rows.length === 0) {
            return res.status(404).json({message: 'Product not found'});
        }

        res.json(result.rows[0]);
     } catch(error) {
         console.error('Error fetching products:',error);
         res.status(500).send('Error fetching product');
     }
})


// API End Point to Add items to the cart 

// async function addToCart(userId,productId,quantity) {
//     try {
//         // Check if the item is already exists in the cart for the user

//         const {rows:existingItems} = await pool.query(
//             'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2',[userId,productId]
//         );

//         if(existingItems. length > 0)
//         {
//             await pool.query
//             (
//                 'UPDATE cart SET quantity = quantity + $1 WHERE user_id = $1 AND product_id = $2', [quantity,userId,productId]
//             );
//         } else 
//         {
//             await pool.query(
//                 'INSERT INTO cart (user_id,product_id,quantity) VALUES ($1,$2,$3)', [userId,productId,quantity]
//             );
//         }

//         res.status(200).json({message:'Item added to the cart successfull'});
//     } 


//     catch (error) {

//         console.error('Error adding item to cart:',error);
//         res.status(500).json({error:"Failed to add item to cart.Please try again"})

//     }
// }


//     pool.query('INSERT INTO cart(user_id,product_id) VALUES ($1,$2)', [userId,productId], (error,insertResult)=> {
//        if(error) 
//        {
//         console.error('Error adding product to cart:',error);
//         return res.status(500).json({message:'Internal server error'});
//        }

//        return res.status(200).json({message: 'Product added to cart'});
//     })
//    })
// })

// app.post('/api/cart/add',async (req,res)=> {

//     const {userId,productId} = req.body;

//     try
//     {
        //Check if the user and product exist

        // const userExists = await pool.query('SELECT 1 FROM users WHERE id = $1', [userId]);
        // const productExists = await pool.query('SELECT 1 FROM products WHERE id = $1',[productId]);

        // if(!userExists.rows.length || !productExists.rows.length)
        // {
        //     return res.status(404).json({error:'user or product not found'});
        // }

        //Add the item to the cart.
//         await pool.query('INSERT INTO cart (user_id,product_id) VALUES ($1,$2)',[userId,productId]);
//         return res.status(200).json({message:'Item added to the cart'});
//     } catch(err)
//     {
//         console.error('Error adding item to cart:',err);
//         return res.status(500).json({error:'Internal server error'});
//     }
// })
const debug = true;

app.post('/api/cart/add', async(req,res) => {
 
    
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if(!token)
    {
        return res.status(401).json({error: 'Unauthorized'});
    }


    jwt.verify(token, secretKey,  (err, decoded) => {
        console.log(secretKey);
        if(err)
        {
            console.error('Token verification failed!!!', err.message);
            return res.status(401).json({error:'Unauthorized'});
        } 

        
            const userId = decoded.userId;
            const {productId, quantity} = req.body;
            console.log('User Id:',userId);

            // console.log(req.body['pid'])
            console.log('Product Id:',productId);
            console.log('quantity:', quantity);
            // console.log('SELECT product_id FROM product WHERE product_id = \''+req.body['pid']+'\'')

            pool.query('INSERT INTO cart (product_id,user_id,quantity) VALUES ($1, $2, $3) RETURNING *', [productId, userId, quantity], (err,result)=> {
                if(err) {
                    console.error('Error adding item to cart:',err);
                    return res.status(500).json({error: 'Internal server error'});
                }

                else
                {
                    const insertedRow = result.rows[0];
                    console.log('Item added to the cart:', insertedRow);
                    return res.json({message:'Item added to cart', item:insertedRow});
                }
            });
     

        });
        // console.log(typeof(productExists));
        // const userExists    =  pool.query('SELECT user_id FROM users WHERE  user_id = $1', [userId]);
        
   
        // if(productExists.rows.length === 0)
        // {
        //    return res.status(404).json({error:'Product not found'});
        // }
   
        // if(userExists.rows.length === 0)
        // {
        //    return res.status(404).json({error:'User not found'});
        // }
   
        // pool.query('INSERT INTO cart(product_id,user_id,quantity) VALUES ($1,$2,$3)',[productId,userId,quantity]);

      
        
    })

    //   try
    //   {
    //     const decoded = jwt.verify(token, secretKey);
    //     const userId = decoded.userId;
    //     const { productId, quantity} = req.body;


    //     const productExists = pool.query('SELECT  * FROM product WHERE product_id = $1', [productId]);
    //     const userExists = pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);

    //     if((await productExists.rows.length === 0 || 
        
    //   }
    
    // const {productId,userId,quantity} = req.body;

    // const userId = req.headers.userid;

    // try
    // {
    //     console.log('Token:',token);

    //     const decoded = await jwt.verify(token, secretKey);
    //     const userId  = decoded.userId;
    //     console.log('User Id:',userId);

    //     const { productId, quantity } = req.body;
    //     console.log('Product Id:',productId);
    //     console.log('Quantity:', quantity);

    //     const productExists  = await pool.query('SELECT id FROM product WHERE id = $1',[productId]);
    //     const userExists = await pool.query('SELECT id FROM users WHERE  id = $1', [userId]);
        
   
    //     if(productExists.rows.length === 0)
    //     {
    //        return res.status(404).json({error:'Product not found'});
    //     }
   
    //     if(userExists.rows.length === 0)
    //     {
    //        return res.status(404).json({error:'User not found'});
    //     }
   
    //    await pool.query('INSERT INTO cart(product_id,user_id,quantity) VALUES ($1,$2,$3)',[productId,userId,quantity]);
   
    //    return res.json({message: 'Item added to cart'});

       
    // } catch(error)
    // {
    //     console.error('Error adding item to cart:', error);
    //     return res.status(500).json({error:'Internal Server Error'});
    // }


    //Check if the product and user Exist
     



// app.get('/api/cart/:userId', async(req,res)=> {

//     const userId = req.params.userId;

//     try
//     {
//         const result = await pool.query('SELECT product.product_id,product.product_name,product.product_price,cart.quantity FROM product INNER JOIN cart ON product.product_id = cart.product_id WHERE cart.user_id = $1', [userId]);
//         res.status(200).json(result.rows);
    
//     }  catch(error)
//     {
//         console.error('Error fetching cart items:',error);
//         res.status(500).json({message:'Internal server error'});
//     }


    

// })

app.get('/api/cart/:userId', async(req,res)=> {
     const userId = req.params.userId;
     const userIdInt = parseInt(userId);

     if(isNaN(userIdInt)) 
     {
        res.status(400).send('Invalid user ID');
        return;
     }
     
     
        try
        {
        //   const userIdInt = parseInt(userId);
          const client = await pool.connect();
          const result = await client.query(`SELECT c.user_id,c.product_id,c.quantity,p.product_name,p.product_desc FROM cart c JOIN product p ON c.product_id = p.product_id WHERE c.user_id = $1`,[userIdInt]);
          client.release();
      
      
          res.json(result.rows);
        } catch(error) {
           console.error('Error fetching cart items:',error);
           res.status(500).send('Error fetching cart items');
        }
     

  
})


// app.delete('/cart/:cartId',async(req,res)=> {
//     const cartItemId = req.params.cartId;

//     try
//     {

//          const client = await pool.connect();
//          await client.query('DELETE FROM cart WHERE cart_id = $1', [cartId]);
//          client.release();

//          res.status(200).json({message:'Item removed from  cart'});
//     }  catch(error)
//     {
//         console.error('Error removing item from cart:',error);
//         res.status(500).json({ error:'Failed to remove item from cart'});
//     }
// })


app.delete('/api/cart/:userId/:productId', async(req,res)=> {
    // const userId = req.params.userId;
    const userId = req.params.userId;
    const userIdInt = parseInt(userId);
    // const cartId = req.params.cartId;
    // const cartIdInt = parseInt(cartId);

    const productId = req.params.productId;
    const productIdInt = parseInt(productId);

    if(isNaN(userIdInt)|| isNaN(productIndInt))
    {
        console.error('Invalid userId or cartId');
        res.status(400).json({message: 'Invalid userId or cartId'});
        return;
    }
    console.log('Recieved userId:',userIdInt);
    // console.log('Recieved cartId:',cartIdInt);

    try
    {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM cart WHERE  user_id = $1 AND product_id = $2', [userIdInt,productIdInt]);
        client.release();
        res.status(200).json({message: 'Item removed from cart successfully'});

        // res.json(result.rows);
    }

    catch(error)
    {
        console.error('Error removing item from cart:',error);
        res.status(500).json({message:'Error removing item from cart'});
    }
})



//For purchasing Items

app.post('/api/purchase', async (req,res) => {

    const {userId, cartItems} = req.body;

    try
    {
        await Promise.all(cartItems.map(async (item) => {
             //Update the quantity in the products table
             const product = await pool.query('SELECT * FROM product WHERE product_id = $1',[item.product_id]);
             if(product.rows.length === 0 || product.rows[0].quantity < item.quantity)
             {
                 throw new Error('Product with ID ${item.product_id} not found or insufficient quantity');
             }
             await pool.query('UPDATE products SET quantity = quantity - $1 WHERE product_id = $2', [item.quantity,item.product_id]);

            //Add the purchase to the purchase_history table
            await pool.query('INSERT INTO purchase_history(user_id,product_id,quantity,purchase_date) VALUES ($1,$2,$3,$4)',[userId, item.product_id,item.quantity,new Date()]);
        }));

        res.status(200).json({message: 'Purchase Successful'});
    } catch(error)
   {
    console.error('Error during purchase:',error);
    res.status(500).json({message:'Error during purchase'});
   }

});


//Purchase Histort API End point

app.get('/api/purchase-history/:user_id',async(req,res)=> {
    const user_id = req.params.user_id;

    try
    {
         const purchaseHistory = await Purchase.findAll({where: {user_id}});
         res.status(200).json(purchaseHistory);
    }

     catch(error)
     {
        console.error('Error fetching purchase history:', error);
        res.status(500).json({message:'Error fetching purchase History'});
     }
})



// app.delete('/cart/remove/:id', authMiddleware, (req,res)=> {
//     const {id} = req.params;

//     res.json({message: 'Item removed from cart'});
// })

app.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`);
});

//API 