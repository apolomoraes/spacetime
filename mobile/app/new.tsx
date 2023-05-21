import { View, Text, TouchableOpacity, Switch, TextInput, ScrollView, Image } from "react-native";
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg';
import { Link, useRouter } from "expo-router";
import Icon from '@expo/vector-icons/Feather';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'
import { api } from "../src/lib/api";


export default function NewMemory() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()

  const [isPublic, setIsPublic] = useState(false)
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState<string | null>(null)

  async function openImagePicker() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      })

      if (result.assets[0]) {
        setPreview(result.assets[0].uri)
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function handleCreateMemory() {
    const token = await SecureStore.getItemAsync('token')

    let coverUrl = ''

    if (preview) {
      const uploadFormData = new FormData()

      uploadFormData.append('file', {
        uri: preview,
        name: 'image.jpg',
        type: 'image/jpeg'
      } as any)

      const uploadResponse = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      coverUrl = uploadResponse.data.fileUrl
    }

    await api.post('/memories', {
      content,
      isPublic,
      coverUrl,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    router.push('/memories')
  }

  return (
    <ScrollView className='flex-1 px-8' contentContainerStyle={{
      paddingBottom: bottom,
      paddingTop: top,
    }}>
      <View className="flex-row items-center justify-between mt-4">
        <NLWLogo />

        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#FFF" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{ false: '#545569', true: '#372560' }}
            thumbColor={isPublic ? '#9b79ea' : '#3c3c3f'}
          />
          <Text className="font-body text-base text-gray-200">
            Tornar memória pública
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
          onPress={openImagePicker}
        >
          {preview ? (
            <Image source={{ uri: preview }} className="h-full w-full rounded-lg object-cover" />
          ) : (
            <View className="flex-row items-center gap-2">
              <Icon name="image" color="#FFF" ></Icon>
              <Text className="font-body text-sm text-gray-200">
                Adicionar foto ou vídeo de capa
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          className="p-0 font-body text-lg text-gray-50"
          multiline
          textAlignVertical="top"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          placeholderTextColor="#56565a"
          value={content}
          onChangeText={setContent}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          className='items-center self-end rounded-full bg-green-500 px-5 py-2'
          onPress={handleCreateMemory}
        >
          <Text className='font-alt text-sm uppercase text-black'>Salvar</Text>
        </TouchableOpacity>
      </View >
    </ScrollView >
  )
}

function setPreview(uri: string) {
  throw new Error("Function not implemented.");
}
