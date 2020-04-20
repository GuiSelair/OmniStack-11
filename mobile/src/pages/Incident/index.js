
import React, { useEffect, useState } from "react"
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
// import * as Intl from "react-native-intl";

import logoHero from "../../assets/logo.png"

import styles from "./styles"
import api from "../../services/api"


export default function Incident(){
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    async function loadIncidents(){
        if (loading){
            return
        }
        if (total > 0 && incidents.length == total){
            return;
        }
        setLoading(true);

        const response = await api.get("incident", {
            params: { page }
        })
        setLoading(false)
        setIncidents([...incidents, ...response.data])
        setTotal(response.headers["x-total-count"])
        setPage(page+1)
    }

    useEffect(() => {
        loadIncidents()
    }, [])
 
    function navigateToDetail(incident){
        navigation.navigate("Detail", { incident })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoHero} style={styles.headerImage} />
                <Text style={styles.headerText}>Total de <Text style={styles.headerTextBold}>{total} casos</Text></Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>

            <FlatList
                keyExtractor={incident => String(incident.id)}
                style={styles.incidentList}
                data={incidents}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{ incident.name }</Text>
                        
                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{ incident.title }</Text>
                        
                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>R${incident.value},00</Text>
                        
                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}