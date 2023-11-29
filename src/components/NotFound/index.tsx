import { Link } from 'react-router-dom'
import React from 'react'

type Props = {}

const NotFound = (props: Props) => {
    return (
        <p>
            There's nothing here: 404!{' '}
            <Link to='/'>
                <b>Get out</b>
            </Link>
        </p>
    )
}

export default NotFound
