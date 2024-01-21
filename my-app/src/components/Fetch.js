import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Fetch() {
    const [products, setproducts] = useState([])

    useEffect(() => {
        axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json')
        .then(res => {
            console.log(res)
            const productsArray = Object.values(res.data.products);
            const sortedProducts = productsArray.sort((a, b) => {
                const popularityDiff = parseInt(b.popularity, 10) - parseInt(a.popularity, 10);
                if (popularityDiff !== 0) {
                  return popularityDiff;
                }
                return parseInt(b.price, 10) - parseInt(a.price, 10);
              });
            setproducts(sortedProducts)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
  return (
    <div>
        <h1> Product List </h1>
        <ul>
            {
                products.map(product => <li key={product.id}>
                    <h3>{product.title}</h3>
                    <p>Price: ${product.price}</p>
                    <p>Popularity: {product.popularity}</p></li>)
            }
        </ul>
    </div>
  )
}

export default Fetch