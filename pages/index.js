import { useState } from 'react';
import useSWR from 'swr'

import {useRouter} from 'next/router'

import appConfig from '../config.json'
import { Box, Button, Text, TextField, Image } from '@skynexui/components';



function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
              ${Tag} {
                  color: ${appConfig.theme.colors.neutrals['000']};
                  font-size: 24px;
                  font-weight: 600;
              }
              `}</style>
    </>
  );
}



function useFormik({
  initialValues
}){
  const [values, setValues] = useState(initialValues)

  // console.log({values})
  function handleChange(event){
    //vai pegar a chave name=userName
   const fieldName = event.target.getAttribute('name') //pega o componente input 
   const fieldNameValue = event.target.value;
    setValues({
      //tudo o que tá no objeto
      ...values,
      //userName: valor do campo
      [fieldName]: fieldNameValue,
    })  
  }
  return {
    values,
    handleChange
  }
}

export default function PaginaInicial() {

  const [showUserInfos, setShowUserInfos] = useState(false)

  const fetcher = async (url) => {
    let res;
    res = await fetch(url);
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
    return res.json();
  };

function profile(username){
  const { data, error } = useSWR('https://api.github.com/users/'+username, fetcher)

  if (error){
    console.log(error.info)
    return (
      <Text
      styleSheet={{
       textAlign:'center',
       color: appConfig.theme.colors.neutrals[100],
       backgroundColor: appConfig.theme.colors.neutrals[600],
       padding: '3px 3px',
       margin: '5px 2px',
       borderRadius: '0px',
       fontSize: '12px'
     }}
      >
      {JSON.stringify(error.info["message"])}
      </Text>
    )
  }
  if (!error) return <div>Loading...</div>

  return (
    <>
              <Text
               styleSheet={{
                textAlign:'center',
                color: appConfig.theme.colors.neutrals[100],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                margin: '2px 2px',
                borderRadius: '1000px',
                fontSize: '12px'
              }}
               >
                 Nome: {data.name}
               </Text>
               <Text
               styleSheet={{
                textAlign:'center',
                color: appConfig.theme.colors.neutrals[100],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                margin: '2px 2px',
                borderRadius: '1000px',
                fontSize: '12px'
              }}
               >
                Public repos: {data.public_repos}
               </Text>
               <Text
               styleSheet={{
                textAlign:'center',
                color: appConfig.theme.colors.neutrals[100],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                margin: '2px 2px',
                borderRadius: '1000px',
                fontSize: '12px'
              }}
               >
                followers: {data.followers}
               </Text>
      </>
  );
  }

  const formik = useFormik({
    initialValues: {
      userName: 'crystyansantos9',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  //usando estado - ele tem um monte de listeners que olham para ele 
  const roteamento = useRouter() /* semelhante ao useNavigation no reactNative */

  return (
    <>
      {/* <GlobalStyle /> */}
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
          onSubmit={(event)=>{
            event.preventDefault()
            //empilha mais uma página em nosso array de navegação - seremos encaminhados para essa página 
           roteamento.push('/chat')
          }}
            as="form"
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
             name="userName"
              value={formik.values.userName}
              fullWidth
              //é necessário um onChange que é o handle do evento de clique 
              onChange={formik.handleChange}

              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >

            
        
            { formik.values.userName.length > 2 ? (
              <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${formik.values.userName}.png`}
              />
              ):(
               <Text
               styleSheet={{
                 textAlign:'center',
                color: appConfig.theme.colors.neutrals[100],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                margin: '2px 5px',
                borderRadius: '1000px',
                fontSize: '18px'
              }}
               >
                 Imagem não encontrada
               </Text>
              )}

              { profile(formik.values.userName)}

               <Text
               variant="body4"
               styleSheet={{
                 color: appConfig.theme.colors.neutrals[200],
                 backgroundColor: appConfig.theme.colors.neutrals[900],
                 padding: '3px 10px',
                 borderRadius: '1000px'
               }}
             >
             {formik.values.userName}
             </Text>   
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>

    </>
  )
}

