"use client"
import Header from '@/components/header'
import Link from 'next/link'
import MyVacancies from '@/components/myvacancies'
import { useDispatch } from 'react-redux'
import { getMyVacancies } from '@/app/store/slices/vacancySlice'
import { useEffect } from 'react'
export default function Vacancy() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyVacancies())
  }, [])

  return (
    <main>
        <Header />
        <div className='container'>
          <div className='flex flex-ai-c flex-js-sb ptb7'>
              <h1>Мои Мероприятия</h1>            
              <Link className='button button-secondary-bordered' href="/create-vacancy">Создать мероприятие</Link>
          </div>             
          <MyVacancies/>  
        </div>
    </main>
  )
}