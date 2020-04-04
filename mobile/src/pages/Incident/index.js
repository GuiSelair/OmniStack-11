
import React from "react"
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

import logoHero from "../../assets/logo.png"

import styles from "./styles"


export default function Incident(){

    const navigation = useNavigation()

    function navigateToDetail(){
        navigation.navigate("Detail")
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoHero} style={styles.headerImage} />
                <Text style={styles.headerText}>Total de <Text style={styles.headerTextBold}>0 casos</Text></Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>

            <FlatList
                keyExtractor={incident => String(incident)}
                style={styles.incidentList}
                data={[1,2,3]}
                showsVerticalScrollIndicator={false}
                renderItem={() => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>APAD</Text>
                        
                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris scelerisque urna ac arcu condimentum egestas. Vivamus fringilla, urna eu luctus suscipit, massa erat aliquam magna, vel bibendum nisl dolor ac risus. </Text>
                        
                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>R$ 330,00</Text>
                        
                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={navigateToDetail}
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