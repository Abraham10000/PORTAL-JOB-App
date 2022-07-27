import { IonContent, IonHeader, IonPage, IonSearchbar, IonFooter,IonToolbar,IonList,IonItem,IonButton,IonButtons,IonIcon, IonTitle, IonLabel, IonCard} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import React, { useState,useEffect } from 'react';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import datas from '../data.json';




const Home: React.FC = (props) => {
  function MyComponent() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState(datas);
    useEffect(() => {
     fetch("https://raw.githubusercontent.com/Abraham10000/PORTAL-JOB-App/main/Data/data.json")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        ) 
        console.log(items);
        
    }, []) 
      return (
        <>
          {items.map(item => (
            <IonCard className='container'>
              <h2 className='poste' key={item['id']}>
              {item['poste']}
            </h2> <br />
            <h2 className='society'>{item['society']}</h2> <br />
            <h3>{item['contrat'].replaceAll(",","\n")}</h3> <br />
            <p className='description'>{item['poste_description']}</p>
            </IonCard>            
          ))}
        </>        
      );    
  }
  const [searchText, setSearchText] = useState('');
  return (
    <IonPage>
      <IonHeader>
        <IonTitle>
          <div className='head'>
          <h2>WELCOME TO PORTAL JOB</h2>
          </div>
        </IonTitle>
      </IonHeader>
      <IonContent>
        <IonToolbar>
          <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} ></IonSearchbar>
          <IonButton className='search' color="secondary" slot='end' onClick={() => SearchData()}>Secondary</IonButton>
        </IonToolbar>
        <IonList>
          <IonItem>
            <IonLabel>
              <MyComponent/>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          Search Text: {searchText ?? '(none)'}
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
  function SearchData() {
    console.log("yes : "+ searchText);   
    const search = encodeURIComponent(searchText).trim();
    const url = "https://raw.githubusercontent.com/Abraham10000/PORTAL-JOB-App/main/Data/data.json" + search;
  


  }
};



export default Home;
