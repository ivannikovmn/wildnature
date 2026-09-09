'use client'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import logo from '../../app/images/logo.png'
import Link from 'next/link'
import { logOut } from '@/app/store/slices/authSlice'
import { useEffect, useState } from 'react'

export default function Header() {
    const dispatch = useDispatch()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])    

    const isAuth = useSelector((state) => state.auth.isAuth)   
    const currentUser = useSelector((state) => state.auth.currentUser)
    console.log(currentUser); 
    return (
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    <div>                       
                        <Link href="/">                            
                            <Image src={logo} alt="WildNature Volunteers" />                               
                        </Link>                                                                          
                        {mounted && currentUser && currentUser.role && currentUser.role.name === "manager" && (
                            <Link href="/vacancy">Мои мероприятия</Link>
                        )}

                        {mounted && currentUser && currentUser.role && currentUser.role.name !== "manager" && (
                            <Link href="/resumes">Мои резюме</Link>
                        )}

                        <a href='https://www.linkedin.com/in/-mikhail-ivannikov/'>Помощь</a>                                            
                    </div>

                    <div>                        
                        {mounted && currentUser && currentUser.role && currentUser.role.name === "manager" && (
                            <Link className="header-button header-button--green" href="/create-vacancy">
                                Создать мероприятие
                            </Link>
                        )}

                        {mounted && currentUser && currentUser.role && currentUser.role.name !== "manager" && (
                            <Link className="header-button header-button--green" href="/create-resume">
                                Создать резюме
                            </Link>
                        )}
                        {mounted && !isAuth && (
                            <Link className="header-button" href="/login">
                                Войти
                            </Link>
                        )}

                        {mounted && isAuth && (
                            <a
                                className="header-button"
                                onClick={() => dispatch(logOut())}
                            >
                                Выйти
                            </a>
                        )}     
                    </div>
                </div>
            </div>
        </header>
    )
}