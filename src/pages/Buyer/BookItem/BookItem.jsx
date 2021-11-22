import React, { useEffect } from 'react'
import { useState } from 'react'
import request from 'services/request'


function BookItem() {
    const [books, setBook] = useState([])
    useEffect(() => {
        const fetchBook = async () => {
            let res = await request.get('/api/book/all')
            setBook(res)
            console.log(res)
        }
        fetchBook()
    }, [])
    return <div>
        <div className="col-sm-3"></div>
        <div className="col-sm-9">
            <ul className="book_list">
                {books.map((book) => (
                    <li className="card" style={{marginTop: "20px"}}>
                        <div className="row no-gutters">
                            <div className="col-sm-5 d-flex justify-content-center">
                                <img className="" height="150px" width="150px" src={book.img}
                                    alt={book.title} />
                            </div>
                            <div className="col-sm-7 d-flex justify-content-center">
                                <div className="card-body">
                                    <h5 className="card-title">{book.title}</h5>
                                    <h6 className="card-title">Số lượng: {book.amount}</h6>
                                    <h4>đ <span>{book.price}</span></h4>

                                    <a href="#" className="btn btn-primary">
                                        Thêm vào giỏ</a>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}

            </ul>


        </div>
    </div>
}

export default BookItem