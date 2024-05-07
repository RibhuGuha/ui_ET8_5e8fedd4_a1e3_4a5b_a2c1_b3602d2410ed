import React from "react";
import { Routes, Route } from "react-router-dom";
import {
ProductCreate, ProductEdit, ProductView, 
Products
} from "screens";

const Component = (props) => {

    return (
        <Routes>
            

                        
                                                        <Route path="Products/view/:id" element={<ProductView {...props} title={'View Product'} />} />
                        <Route path="Products/edit/:id" element={<ProductEdit {...props} title={'Edit Product'} />} />
                        <Route path="Products/create" element={<ProductCreate {...props} title={'Create Product'} />} />

                                                                                                        </Routes>
    )

};

export default Component;