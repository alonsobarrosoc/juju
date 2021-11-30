import React from 'react'
import { API } from '../../config';


function ShowImage({ item, url }) {
    return (
        <div className="product-img">
            <img
                src={`${API}/${url}/photo/${item._id}`}
                alt={item.name}
                className="mb-3 img-cont rounded-full h-24"
                style={{ maxHeight: "600px", maxWidth: "300px" }} />
        </div>
    )
}

export default ShowImage
