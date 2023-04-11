import React, { useState } from 'react';

import { Alert, View, ScrollView, Text, Image, Button, StyleSheet, TextInput } from 'react-native';




export default function App() {

 const [pokemonEscolhido, setPokemonEscolhido] = useState(null);

 const [pokemonEscolhido2, setPokemonEscolhido2] = useState(null);

 const getPokemonData = (idPokemon, player) => {

  const endpoint = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`;

  console.log(endpoint);

  fetch(endpoint)

   .then(resposta => resposta.json())

   .then(json => {

    const pokemon = {

     nome: json.name,

     img: json.sprites.other["official-artwork"].front_default,

     peso: json.weight,

     hp: json.stats[0].base_stat,

     attack: json.stats[1].base_stat,

     defense: json.stats[2].base_stat,

     speed: json.stats[3].base_stat,

    };

   pokemon.media = (pokemon.peso+ pokemon.hp + pokemon.attack + pokemon.defense+ pokemon.speed)/5;

  

    player == 1 ? setPokemonEscolhido(pokemon) : setPokemonEscolhido2(pokemon);

   })

   .catch(() => {

    Alert.alert('Erro', 'Não foi possível carregar os dados do Pokémon');

   });

 }






 const sortearIdPokemon = () => {

  const nsorteado = Math.floor(Math.random() * 1010) + 1;

  const nsorteado2 = Math.floor(Math.random() * 1010) + 1;

  getPokemonData(nsorteado, 1);

  getPokemonData(nsorteado2, 2);

 }




function Duelo () {

  if (pokemonEscolhido === null || pokemonEscolhido2 === null) {

   Alert.alert('Erro', 'Escolha os pokémons para a batalha!');

   return;

  }



  const media1 = pokemonEscolhido.media;

  const media2 = pokemonEscolhido2.media;



  if (media1 > media2) {

   Alert.alert('Resultado', `${pokemonEscolhido.nome} venceu !`);

  } else if (media1 < media2) {

   Alert.alert('Resultado', `${pokemonEscolhido2.nome} venceu !`);

  } else {

   Alert.alert('Resultado', 'A batalha terminou em empate!');

  }

 }









 return (

  <View style={styles.container}>

   <ScrollView>

    <View style={styles.topo}>

     <Text style={styles.topoTitulo}>Sorteio de Pokemon</Text>

    </View>

    <View>

     <TextInput style={styles.input} placeholder='JOGADOR 1'/>

    </View>

    {pokemonEscolhido != null && (

     <View style={styles.pokemonBox}>

      <Image resizeMode="stretch" source={{ uri: pokemonEscolhido.img }} style={styles.pokemonImg} />

      <View>

       <Text style={styles.pokemonNome}>Nome: {pokemonEscolhido.nome}</Text>

       <Text style={styles.pokemonPeso}>Peso: {pokemonEscolhido.peso}</Text>

       <Text style={styles.pokemonPeso}>hp: {pokemonEscolhido.hp}</Text>

       <Text style={styles.pokemonPeso}>attack: {pokemonEscolhido.attack}</Text>

       <Text style={styles.pokemonPeso}>defense: {pokemonEscolhido.defense}</Text>

       <Text style={styles.pokemonPeso}>speed: {pokemonEscolhido.speed}</Text>

       <Text style={styles.pokemonPeso}>media: {pokemonEscolhido.media}</Text>

      </View>

     </View>

    )}

   

    <Button title="Sortear Pokemon" onPress={() => sortearIdPokemon()} />

   



    <View>

     {pokemonEscolhido2 != null && (

      <View style={styles.pokemonBox}>

       <Image resizeMode="stretch" source={{ uri: pokemonEscolhido2.img }} style={styles.pokemonImg} />

       <View>

        <Text style={styles.pokemonNome}>Nome: {pokemonEscolhido2.nome}</Text>

        <Text style={styles.pokemonPeso}>Peso: {pokemonEscolhido2.peso}</Text>

        <Text style={styles.pokemonPeso}>hp: {pokemonEscolhido2.hp}</Text>

        <Text style={styles.pokemonPeso}>attack: {pokemonEscolhido2.attack}</Text>

        <Text style={styles.pokemonPeso}>defense: {pokemonEscolhido2.defense}</Text>

        <Text style={styles.pokemonPeso}>speed: {pokemonEscolhido2.speed}</Text>

        <Text style={styles.pokemonPeso}>media: {pokemonEscolhido2.media}</Text>

       </View>

      </View>

     

     )}




    </View>

    <View>

     <TextInput style={styles.input} placeholder='JOGADOR 2'/>

    </View>

    <Button style={styles.abacate} title="Batalhar" onPress={() => Duelo()} />

   </ScrollView>

  </View>

 );

}

const styles = StyleSheet.create({

 container: { flex: 1, backgroundColor: '#fff' },

 topo: { height: 100, padding: 20, paddingTop: 40, marginBottom: 20, backgroundColor: 'black' },

 topoTitulo: { fontSize: 22, marginBottom: 10,backgroundColor:'black', color: '#ffab40', textAlign: 'center' },

 cardContainer: { borderWidth: 1, borderColor: '#d5d5d5', borderRadius: 4, marginBottom: 10, marginHorizontal: 20, padding: 10 },

 cardTitle: { fontSize: 22, marginBottom: 20, textAlign: 'center', color: '#656565' },

 pokemonBox: { alignItems: 'flex-start', display: 'flex', flexDirection: 'row', },

 pokemonNome: { fontSize: 22 },

 pokemonPeso: { fontSize: 18 },

 pokemonImg: { width: 150, height: 150, },

 input:{backgroundColor:'#f5f5f5', color:'white',borderRadius:20},

 abacate:{backgroundColor:'purple ', color: 'white'}

});