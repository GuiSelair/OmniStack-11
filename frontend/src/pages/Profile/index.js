import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { FiPower, FiTrash2 } from "react-icons/fi"

import logoHero from "../../assets/logo.svg"

import "./styles.css"
import api from "../../services/api"

export default function Profile() {
    const [incidents, setIncidents] = useState([])

    const history = useHistory()

    const ongName = localStorage.getItem("ongName")
    const ongID = localStorage.getItem("ongID")

    useEffect(() => {
        async function fetchData(){
            const response = await api.get(`ongs/${ongID}/incidents`)
            setIncidents(response.data)
        }
        fetchData()
    },[ongID])


    async function handleDeleteIncident(id){
        try{
            await api.delete(`/incident/${id}`, {
                headers: {
                    Authorization: ongID
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        }
        catch(error){
            alert("Erro ao deletar caso, tente novamente")
        }
    }

    function handleLogout(){
        localStorage.clear()
        history.push("/")
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoHero} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}> 
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(incident.value)}</p>
                        <button type="button" onClick={() => {handleDeleteIncident(incident.id)}}>
                            <FiTrash2 size={20} color="a8ab3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}