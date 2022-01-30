import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useEffect, useState } from 'react';
import appConfig from '../config.json';
import {createClient } from '@supabase/supabase-js'

const SUPABASE_ANON_KEY =process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_URL =process.env.NEXT_PUBLIC_SUPABASE_URL 
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY )

//pegando dados
// const dadosSupabase = supabaseClient
// .from('mensagens')
// .select('*')
// .then((dados)=>{
//     dados.data.map(mensagem=>{
//         console.log(mensagem)
//     })
// })

export default function ChatPage() {
    const [mensagem, setMensagem] = useState('')
    const [listaDeMensagem, setListaDeMensagem] = useState([]) //array vazio 

    //efeito e ação externa 
    useEffect(()=>{
        supabaseClient
        .from('mensagens')
        .select('*')
        .order('id', { ascending: false}) //para que no primeiro user effect a ultima mensagem veio no bottom da caixa de mensagem e não no topo 
        .then(( {data})=>{
        //    console.log("Dados do banco", data)
           setListaDeMensagem(data)
        })
    },[]) //vai mudar apenas quando a lista de mensagens receber uma nova mensagem 

    // Sua lógica vai aqui
    /**
     *  Usuario digita no campo textarea
     * Aperta enter para enviar mensagem 
     *  Tem que adicionar o texto na listagem 
     * 
     *  // Dev
     *  - [x] Campo criado
     *  - [ ] Vamos usar o onChange para usar o useState ( ter if pra caso seja enter pra limpar a variavel )
     *  - [ ] Lista de mensages 
     */

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: listaDeMensagem.length,
            from: 'crystyansantos9',
            texto: novaMensagem,
        }

        supabaseClient
        .from('mensagens')
        .insert([
            //tem que ser um objeto com os mesmos campos que estão no supabase
            mensagem // ensiro a mensagem
        ]).then(({data})=>{ //pego mensagem aqui de novo 
            console.log("Criando mensagem :: ", data)
              // para inverter a ordem de apresentação das mensagens no campo de visualizaçaõ de mensagens 
            setListaDeMensagem([
                data[0], //pega somente a nova mensagem enviada 
                ...listaDeMensagem,
            ])
        })


      
        setMensagem('')
    }

    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >


                 
                     <MessageList mensagens={listaDeMensagem} onRemoveMessage={setListaDeMensagem}/>
                    {/* Lista de Mensagem {listaDeMensagem.map((mensagemAtual)=>{
                       console.log(mensagemAtual)
                       //devolvo um novo objeto para cada objeto iterado
                       return (
                           <li key={mensagemAtual.id}>
                               {mensagemAtual.from} : {mensagemAtual.texto}
                           </li>
                       )
                   })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {/* {Area de Digitação do usuário} */}
                        <TextField
                            value={mensagem}
                            onChange={(e) => {
                                const value = e.target.value
                                console.log(value)
                                setMensagem(value)
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    console.log(event)
                                    //o novo array será todo o valor já existente em lista de mensagem + mais a mensagem atual no estado mensagem
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log('MessageList', props);
    function removeMensagem(id){
       console.log("Pegou a porra do id", id)
       console.log("lista de mensagem :: ", props.mensagens)
       const novaListaDeMensagem = props.mensagens.filter(mensagem=>mensagem.id !== id)
       props.onRemoveMessage(
           novaListaDeMensagem
       )
    }
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.from}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            {' '}
                            <Button 
                        label="remover" 
                        onClick={()=>{
                            removeMensagem(mensagem.id)
                        }}
                        />

                        </Box>
                        {mensagem.texto}
                       
                    </Text>
                )
            })}
        </Box>
    )
}