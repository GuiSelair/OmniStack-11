import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { FiLogIn } from "react-icons/fi"

import "./styles.css"
import heroesImage from "../../assets/heroes.png"
import logoImg from "../../assets/logo.svg"

import api from "../../services/api.js"

export default function Logon(){
    const [id, setId] = useState("")
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const response = await api.post("sessions", { id })     
            localStorage.setItem("ongID", id)
            localStorage.setItem("ongName", response.data.name)
            history.push("/profile")
        }
        catch(error){
            alert("Error ao fazer o Logon. Verifique sua conexão ou tente mais tarde.")
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="LogoHeroes"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input 
                        type="text"    
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button"  type="submit">Entrar</button>
                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImage} alt="Heroes"/>
        </div>
    )
}