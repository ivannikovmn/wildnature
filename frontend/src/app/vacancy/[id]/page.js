'use client'
import Header from '@/components/header'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVacancyById } from '@/app/store/slices/vacancySlice'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { END_POINT } from '@/config/end-point'
import { getMyResumes } from '@/app/store/slices/resumeSlice'
import { createApply, getEmployeeApplies, getVacancyApplies } from '@/app/store/slices/applySlice'
import { formatDateTime } from '@/app/utils/format'

export default function VacancyPage() {

    const dispatch = useDispatch();
    const {id} = useParams();
    const vacancy = useSelector(state => state.vacancy.vacancy)
    const currentUser = useSelector(state => state.auth.currentUser)
    const [mounted, setMounted] = useState(false)

    const resumes = useSelector(state => state.resume.resumes)
    const applies = useSelector(state => state.apply.applies)

    const [resumeId, setResume] = useState()
    console.log(resumes);
    useEffect(() => {
    if(resumes[0]) {
        setResume(resumes[0].id)      
    }
    }, [resumes])    

    useEffect(() => {
        setMounted(true)
    }, [])
    
  useEffect(() => {
      dispatch(getVacancyById(id))
  }, [id])

  useEffect(() => {
      if (!currentUser) return

      if (currentUser.role.name === 'employee') {
          dispatch(getMyResumes())
          dispatch(getEmployeeApplies())
      } else {
          dispatch(getVacancyApplies(id))
      }
  }, [currentUser, id])

  console.log("in page", vacancy);

  const handleApply = () => {
    dispatch(createApply({
      resumeId,
      vacancyId: id
    }))
  }

  let isApplied = applies.some(item => item.vacancyId === id * 1);

  console.log(isApplied, applies);  

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
              <Link href={`/vacancy/${id}/applies`} className='link'>Участники: {applies.length}</Link>
              <h1>{vacancy.name}</h1>
              <p>{vacancy.about_company}</p>


              {
                mounted && currentUser && currentUser.role.name === 'employee' && (
                  <select className='input mtb4' value={resumeId} onChange={(e) => setResume(e.target.value)} style={{maxWidth: `200px`}}>
                    {resumes.map(item =>(<option key={item.id} value={item.id}>{item.first_name} {item.last_name}</option>))}
                  </select>
                )
              }

              {mounted && currentUser && currentUser.id !== vacancy.userId && !isApplied && <button className='button button-primary' onClick={handleApply}>Откликнуться</button>}
              {mounted && currentUser && currentUser.id !== vacancy.userId && isApplied && <Link className='button button-primary' style={{maxWidth: `200px`}} href="/applies">Смотреть отклик</Link>}
              
          </div>
          {vacancy.company && <p className='secondary mt7'><b>{vacancy.company.name}</b></p>}
          {vacancy.company && <p className='secondary'>{vacancy.company.description}</p>}
          
          <p className='secondary' dangerouslySetInnerHTML={{ __html:vacancy.description}}></p>

          <p className='secondary'>Дата: {formatDateTime(vacancy.event_date)}</p>
          <p className='secondary'>Адрес: {vacancy.address }</p>

        </div>
      </main>    
  )
}