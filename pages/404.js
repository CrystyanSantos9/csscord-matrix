// pages/404.js
import { useState } from 'react'
import {useRouter} from 'next/router'

import appConfig from '../config.json'
import { Box, Button, Text, TextField, Image } from '@skynexui/components';

export default function Custom404() {

    const roteamento = useRouter() /* semelhante ao useNavigation no reactNative */

    const [imageStyle, setImageStyle] = useState({
        borderRadius: '50%',
        marginBottom: '16px',
        opacity: '0.5'
    })

    function handleOnMouseEnter() {
       setImageStyle({
        borderRadius: '50%',
        marginBottom: '16px',
        opacity: '0.8'
       })
       roteamento.push('/')
    }
    
    return (
        <Box
            // onMouseEnter={()=>{
            //     handleOnMouseOver()
            //   }}
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
            }}
        >
            <Text variant="body1" styleSheet={{ fontSize: '2.5em', marginBottom: '32px', color: appConfig.theme.colors.neutrals[100] }}>Página não encontrada.</Text>
            <Image
                onMouseEnter={() => {
                    handleOnMouseEnter()
                }}
                styleSheet={imageStyle}
                src={`https://image.freepik.com/vetores-gratis/glitch-error-404-page_23-2148105404.jpg`}
            />

        </Box>
    )
}