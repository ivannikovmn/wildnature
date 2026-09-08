'use client';

import Header from '@/components/header'
import Input from '@/components/input';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { editResume, getResumeById } from '@/app/store/slices/resumeSlice';

export default function EditResume() {
    
  const router = useRouter()
  const dispatch = useDispatch()
  const {id} = useParams();
  const resume = useSelector(state => state.resume.resume)
  const [first_name, setName] = useState("")
  const [last_name, setSurname] = useState("") 
  console.log("rerender")

  useEffect(() => {
    console.log("didMount");
    dispatch(getResumeById(id))
  }, [id])

  const handleSave = () => {
    dispatch(editResume(    {
      id: resume.id,
      first_name,
      last_name    
    }, router))
  }  

    useEffect(()=> {
    if(resume.id){
        setName(resume.first_name)
        setSurname(resume.last_name)
    }
  }, [resume])

  return (
    <main>
      <Header />
      <div className='container p7'>
        <h1>Ваше резюме</h1>

        <h3>Контактные данные</h3>
        <Input placeholder="" type="text" label="Имя" size="fieldset-md" onChange={(e) => setName(e.target.value)} value={first_name}/>
        <Input placeholder="" type="text" label="Фамилия" size="fieldset-md" onChange={(e) => setSurname(e.target.value)} value={last_name}/>                      
        <button className='button button-primary' onClick={handleSave}>Сохранить и опубликовать</button>
      </div>
    </main>
  )
}