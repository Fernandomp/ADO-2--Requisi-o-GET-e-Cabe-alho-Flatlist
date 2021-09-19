import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, Image,Modal, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';

async function executeGet(url,jsonState){
  //get síncrono com o uso do fetch
  await fetch(url)
  .then(response => {
        if (response.status === 200) {
          console.log('sucesso');
          response.json().then(function(result){ 

            //console.log(result);
            jsonState(result)

            });
        } else {
          throw new Error('Erro ao consumir a API!');
        }
    })
    .then(response => {
      //console.debug(response);
    }).catch(error => {
      console.error(error);
    });
}

const ShowDetalhes = ({display,toogleModal,mensagem,mensagem2,mensagem3}) => (   
    <Modal
          animationType="fade"
          transparent={true}
          visible={display}
          onRequestClose={toogleModal}
    >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                <Pressable onPress={toogleModal}>
                  <Text>{mensagem}</Text>
                  <Text>{mensagem2}</Text>
                  <Text>{mensagem3}</Text>
                  
                </Pressable>
          </View>
        </View>
   </Modal>
        
 )

const Cidade = ({populacao,area,cidade}) => {

    //state para controle do Modal
    const [modal,setModal] = React.useState(false)

    function mudaModal(){
      setModal(!modal)
    }

    return(
    <View>
      <ShowDetalhes display={modal} toogleModal={mudaModal} mensagem={cidade} mensagem2={populacao} mensagem3={area}  />
  
      
      <Pressable onPress={mudaModal}>
       
        <Text style={styles.paragraph}>{cidade}</Text>
      </Pressable>
    </View>
    )
}


export default function App() {

  const [jsonData,setJsonData] = React.useState({})

  executeGet("https://jsonplaceholder.typicode.com/users",setJsonData)

  //função que renderiza cada item do FlatList
  function meuItem({item}){
       
    return(
      <Cidade cidade={item.name} 
              populacao={item.username}
              area={item.email}
      />
    )
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
             <Text> Lista de usuários</Text>
         </View>
        
     </SafeAreaView>

      <FlatList
        data={jsonData}
        renderItem={meuItem}
        keyExtractor={item => item.id}
      />
    
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#0846FF',
    padding: 8,
  },
  header:{
    
    margin: 12,
    padding: 12,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'green',
    borderRadius:100,
    alignSelf: 'center',
    

  },
  paragraph: {
    margin: 12,
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#FFFC42',
    borderRadius:100,
    
  },
  tinyLogo: {
    width: 50,
    height: 50,
    alignSelf: 'center'
  },
  modalView: {
    margin: 20,
    fontSize: 20,
    backgroundColor: "#D65106",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});