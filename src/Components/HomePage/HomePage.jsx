import React, {useState} from 'react';
import ProductCard from "../ProductComponent/ProductCard";
import Slider from "react-slick";

export default function Widget() {
    const [searchText, setSearchText] = useState("");
    const [tempSearchText, setTempSearchText] = useState("");
    const exampleProducts = [
        {
            item: {
                id: 1,
                name: 'Product 1',
                description: 'This is a description for product 1.',
                category: {
                    id: 101,
                    name: 'Category 1',
                },
                price: 1000,
            },
        },
        {
            item: {
                id: 2,
                name: 'Product 2',
                description: 'This is a description for product 2.',
                category: {
                    id: 102,
                    name: 'Category 2',
                },
                price: 2000,
            },
        },
        {
            item: {
                id: 3,
                name: 'Product 3',
                description: 'This is a description for product 3.',
                category: {
                    id: 103,
                    name: 'Category 3',
                },
                price: 3000,
            },
        },
        {
            item: {
                id: 4,
                name: 'Product 4',
                description: 'This is a description for product 4.',
                category: {
                    id: 103,
                    name: 'Category 4',
                },
                price: 3000,
            },
        },
        {
            item: {
                id: 5,
                name: 'Product 5',
                description: 'This is a description for product 5.',
                category: {
                    id: 103,
                    name: 'Category 4',
                },
                price: 3000,
            },
        },
    ];

    var settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const searchProducts = (e) => {
        e.preventDefault();
        setSearchText(tempSearchText);
    };

    const productGroups = [];
    for (let i = 0; i < exampleProducts.length; i += 3) {
        productGroups.push(exampleProducts.slice(i, i + 3));
    }
    return (
        <div>
            <div className="bg-white text-black py-5 px-3 text-center">
                <h1 className="text-danger display-4 font-weight-bold mb-4">Join Us in Making a Difference</h1>
                <p className="lead mb-4">Explore unique items and experiences while supporting a great cause.</p>
                <button className="btn btn-danger btn-lg rounded-pill">Start Bidding</button>
                <img className="img-fluid d-block mx-auto mt-4 rounded-lg shadow"
                     src={process.env.PUBLIC_URL + '/home-bg.png'} alt="Charity Bidding Platform"/>
            </div>
            <div className="d-flex aligns-items-center justify-content-center mt-5">
                <form className="row g-3 w-100 align-items-center justify-content-center">
                    <div className="col-auto">
                        <input
                            type="text"
                            className="form-control"
                            id="inputPassword2"
                            placeholder="Enter Product Name..."
                            onChange={(e) => setTempSearchText(e.target.value)}
                            style={{
                                width: "350px",
                            }}
                            value={tempSearchText}
                            required
                        />
                    </div>
                    <div className="col-auto">
                        <button
                            type="submit"
                            className="btn bg-color custom-bg-text mb-2"
                            onClick={searchProducts}
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className="container mt-5 mb-2" style={{height: '1000px'}}>
                <h1 className="text-danger font-weight-bold mb-4 text-center">Recent Bids</h1>
                <div className="row w-100">
                    <Slider {...settings}>
                        {exampleProducts.map((product, index) => (
                            <ProductCard key={index} item={product.item}/>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}
