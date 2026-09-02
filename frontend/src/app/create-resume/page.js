'use client';

import Header from '@/components/header'
import Input from '@/components/input';
// import axios from 'axios';

export default function CreateResume() {
  console.log("rerender")
 
  return (
    <main>
      <Header />
      <div className='container pt7'>
        <h1>Ваше резюме</h1>

        <h3>Контактные данные</h3>
        <Input placeholder="" type="text" label="Имя" size="fieldset-md"/>
        <Input placeholder="" type="text" label="Фамилия" size="fieldset-md"/>                        
      </div>
    </main>
  )
}