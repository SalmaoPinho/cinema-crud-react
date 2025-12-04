import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">CineWeb 123</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <div className="navbar-nav">
                <a className="nav-link active" aria-current="page" href="/sessoes">Sessões</a>
                <a className="nav-link" href="/filmes">Filmes</a>
                </div>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown link
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
                </li>
            </ul>
            </div>
        </div>
        </nav>
        </>
    );
}