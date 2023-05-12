import '../../index.css'
import Header from "./Header.jsx"


import {Link} from 'react-router-dom'

export default function Layout(props) {
    return(
        <>
        <Header />
        <div className="main-content">{props.children}</div>
        </>
    )
}