import { StatusBar } from 'expo-status-bar';
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import blurBg from '../src/assets/bg-blur.png';
import Stripes from '../src/assets/stripes.svg';
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg';
import { useEffect } from 'react';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import { useRouter } from "expo-router";
import { api } from '../src/lib/api';
import * as SecureStore from 'expo-secure-store'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import {
  BaiJamjuree_700Bold,
} from '@expo-google-fonts/bai-jamjuree';

const StyledStripes = styled(Stripes)

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/33a50d7a7d794c75eb1f',
}
export default function App() {
  const router = useRouter();

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })

  const [request, response, signInWithGithub] = useAuthRequest({
    clientId: '33a50d7a7d794c75eb1f',
    scopes: ['identity'],
    redirectUri: makeRedirectUri({
      scheme: 'spacetimenlw',
    }),
  },
    discovery
  )

  async function handleGithubOAuthCode(code: string) {
    const response = await api.post('/register', {
      code,
    })

    const { token } = response.data;

    await SecureStore.setItemAsync('token', token);

    router.push('/memories');
  };

  useEffect(() => {
    // console.log(makeRedirectUri({
    //   scheme: 'spacetimenlw',
    // }),)

    if (response?.type === 'success') {
      const { code } = response.params

      handleGithubOAuthCode(code)
    }
  }, [response])

  if (!hasLoadedFonts) {
    return null;
  }

  return (
    <ImageBackground
      source={blurBg}
      className='relative flex-1 items-center bg-gray-900 px-8 py-10'
      imageStyle={{
        position: 'absolute',
        left: '-80%',
      }}
    >
      <StyledStripes className='absolute left-2' />

      <View className='flex-1 items-center justify-center gap-6'>
        <NLWLogo />

        <View className='space-y-2'>
          <Text className='text-center font-title text-2xl leading-tight text-gray-50'>
            Sua cápsula do tempo
          </Text>

          <Text className='text-center font-body text-base leading-relaxed text-gray-100'>
            Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className='rounded-full bg-green-500 px-5 py-2'
          onPress={() => signInWithGithub()}
        >
          <Text className='font-alt text-sm uppercase text-black'>CADASTRAR LEMBRANÇA</Text>
        </TouchableOpacity>
      </View>

      <Text className='text-center font-body text-sm leading-relaxed text-gray-200'>Feito com 💜 por Apolo na NLW da Rocketseat</Text>

      <StatusBar style="light" translucent />
    </ImageBackground>
  );
}