import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
  ListRenderItemInfo
} from 'react-native'

import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard'

interface SkillData {
  id: string
  name: string
}

export const Home = () => {
  const [newSkill, setNewSkill] = useState('')
  const [mySkills, setMySkills] = useState<SkillData[]>([])
  const [greeting, setGreeting] = useState('')

  const handleAddNewSkill = () => {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMySkills(prevMySkills => [...prevMySkills, data])
  }

  const handleRemoveSkill = (id: string) => {
    setMySkills(prevMySkills => prevMySkills.filter(mySkill => mySkill.id !== id))
  }

  const renderMySkill = ({ item }: ListRenderItemInfo<SkillData>) =>
    <SkillCard skill={item.name} onRemoveSkill={() => handleRemoveSkill(item.id)} />

  useEffect(() => {
    const currentHour = new Date().getHours()

    if (currentHour < 12) {
      setGreeting('Good morning')
      return
    }

    if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good afternoon')
      return
    }

    setGreeting('Good night')
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome, Rodrigo</Text>
      <Text style={styles.greetings}>{greeting}</Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        value={newSkill}
        onChangeText={setNewSkill}
      />

      <Button onAddNewSkill={handleAddNewSkill} />

      <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={renderMySkill}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1f1e25',
    fontSize: 18,
    color: '#fff',
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  greetings: {
    color: '#fff',

  }
})
