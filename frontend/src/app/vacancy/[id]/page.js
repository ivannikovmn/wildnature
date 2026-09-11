'use client'
import Header from '@/components/header'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVacancyById } from '@/app/store/slices/vacancySlice'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { END_POINT } from '@/config/end-point'

export default function VacancyPage() {

    const dispatch = useDispatch();
    const {id} = useParams();
    const vacancy = useSelector(state => state.vacancy.vacancy)
    const currentUser = useSelector(state => state.auth.currentUser)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

  const didMount = () => {
    dispatch(getVacancyById(id))
  }

  console.log("in page", vacancy);

  useEffect(didMount, [])
     

  return (
    <main>
      <Header />
      <div className='container'>
        {mounted && currentUser && currentUser.id === vacancy.userId && <div className='flex flex-ai-c flex-js-sb ptb7'>            
            <Link className='button button-secondary-bordered' href={`/edit-vacancy/${vacancy.id}`}>Редактировать</Link>
        </div>}
        <div className='card mt7'>
            {vacancy.branding_photo && (
                <p>
                    <Image
                        src={`${END_POINT}${vacancy.branding_photo}`}
                        alt={vacancy.name}
                        width={437}
                        height={561}
                        style={{ objectFit: "cover" }}
                    />
                </p>
            )}

            <h1>{vacancy.name}</h1>
            <p>{vacancy.about_company}</p>

            {mounted && currentUser && currentUser.id !== vacancy.userId && (
                <button className='button button-primary'>
                    Участвовать
                </button>
            )}
        </div>
        {vacancy.company && <p className='secondary mt7'><b>{vacancy.company.name}</b></p>}
        {vacancy.company && <p className='secondary'>{vacancy.company.description}</p>}

        {/* <p className='secondary'>{vacancy.description}</p> */}
        <p className='secondary' dangerouslySetInnerHTML={{ __html:vacancy.description}}></p>

        <p className='secondary'>Дата: {vacancy.event_date }</p>
        <p className='secondary'>Адрес: {vacancy.address }</p>

      </div>
    </main>    
  )
}