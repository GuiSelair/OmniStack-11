
import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"

import "./styles.css"
import api from "../../services/api"

import logoHero from "../../assets/logo.svg"

export default function NewIncident(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [value, setValue] = useState("")

    const ongID = localStorage.getItem("ongID")

    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()

        const data = {
            title,
            description,
            value
        }

        try{
            const response = await api.post("incident", data, {
                headers: {
                    Authorization: ongID,
                }
            })
            alert(`A ID do novo caso é: ${response.data.id}`)
            history.push("/profile")
        }
        catch(error){
            alert("Error ao cadastrar novo caso. Verifique seu conexão ou tente mais tarde.")
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoHero} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhamente para encontrar um herói para resolver isso.</p>

                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Titulo do caso"
                        value={title}
                        onChange = {e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange = {e => setDescription(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Valor"
                        value={value}
                        onChange = {e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}