import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './styles';

export function Home(){
  const [partcipants, setpartcipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd(){
    if(partcipants.includes(participantName)){
      return Alert.alert('Participante Existe', 'Já existe um participante na lista com esse nome')
    }

    setpartcipants(prevState =>[ ...prevState, participantName])
    setParticipantName('');

  }

  function handleParticipantRemove(name: string){

    Alert.alert('Remover', `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setpartcipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Comicon
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 de Março de 2024.
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder='Nome do participante'
          placeholderTextColor="#6b6b6b"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={handleParticipantAdd}
        >
          <Text 
            style={styles.buttonText}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={partcipants}
        keyExtractor={item => item}
        renderItem={({item}) =>(
          <Participant 
            key={item} 
            name={item} 
            onRemove={() => handleParticipantRemove(item)} 
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />

    </View>
  )
}