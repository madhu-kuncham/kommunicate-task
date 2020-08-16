import React from 'react'

export const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const passPageNumberToParent = (currentPage) => {
        paginate(currentPage);
    }

    return (
        <div>
            {
                <ul>
                    {pageNumbers.map(number => (
                        <a key={number}>
                            <button className='pagination' onClick={(e) => passPageNumberToParent(number)} href="#" >
                                {number}
                            </button>
                        </a>
                    ))}
                </ul>
            }
        </div>
    )
}

export default Pagination;